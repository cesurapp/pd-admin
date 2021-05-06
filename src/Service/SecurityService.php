<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Service;

use App\Entity\Account\User;
use Doctrine\Common\Annotations\AnnotationReader;
use Pd\WidgetBundle\Widget\WidgetInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\RouterInterface;

/**
 * Find All Method Permissions.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class SecurityService
{
    public function __construct(
        private RouterInterface $router,
        private WidgetInterface $widget)
    {
    }

    /**
     * Get ACL Roles.
     */
    public function getACL(): array
    {
        return [
            User::ROLE_DEFAULT => User::ROLE_DEFAULT,
            User::ROLE_ALL_ACCESS => User::ROLE_ALL_ACCESS,
        ];
    }

    /**
     * Get All Method Roles.
     */
    public function getRoles(): array
    {
        // Finds Route Class
        $routes = $this->router->getRouteCollection()->all();
        $classMethods = [];
        foreach ($routes as $route) {
            // Check Action
            if (isset($route->getDefaults()['_controller']) && (2 === \count($controller = explode('::', $route->getDefaults()['_controller'])))) {
                if (!class_exists($controller[0])) {
                    continue;
                }

                if (!isset($classMethods[$controller[0]])) {
                    $classMethods[$controller[0]] = [];
                }
                $classMethods[$controller[0]][] = $controller[1];
            }
        }

        // Find Class Roles
        $reader = new AnnotationReader();
        $roles = [];
        foreach ($classMethods as $class => $methods) {
            // Class Reflection
            try {
                $reflection = new \ReflectionClass($class);
            } catch (\ReflectionException $e) {
                break;
            }

            // Read Class Annotation
            if ($customRoles = $reflection->getConstant('CUSTOM_ROLES')) {
                foreach ($customRoles as $role) {
                    $roleObject = explode('_', $role);
                    if (3 === count($roleObject)) {
                        $access = $roleObject[2];
                        $roleObject = $roleObject[0] . '_' . $roleObject[1];

                        if (isset($roles[$roleObject])) {
                            $roles[$roleObject][$access] = $roleObject . '_' . $access;
                        } else {
                            $roles[$roleObject] = [$access => $roleObject . '_' . $access];
                        }
                    }
                }
            }

            // Read Method Annotation
            foreach ($methods as $method) {
                if (!$reflection->hasMethod($method)) {
                    continue;
                }

                foreach ($reader->getMethodAnnotations($reflection->getMethod($method)) as $access) {
                    if ($access instanceof IsGranted) {
                        $roleObject = explode('_', $access->getAttributes());
                        if (3 === \count($roleObject)) {
                            $access = $roleObject[2];
                            $roleObject = $roleObject[0] . '_' . $roleObject[1];

                            if (isset($roles[$roleObject])) {
                                $roles[$roleObject][$access] = $roleObject . '_' . $access;
                            } else {
                                $roles[$roleObject] = [$access => $roleObject . '_' . $access];
                            }
                        }
                    }
                }
            }
        }

        // Add Widget Roles
        $widgets = $this->widget->getWidgets(false);
        foreach ($widgets as $widget) {
            if ($widget->getRole()) {
                foreach ($widget->getRole() as $role) {
                    $access = explode('_', $role);

                    // Set Main
                    if (!isset($roles[$access[0] . '_' . $access[1]])) {
                        $roles[$access[0] . '_' . $access[1]] = [];
                    }

                    // Add Role Access
                    $roles[$access[0] . '_' . $access[1]][$access[2]] = $role;
                }
            }
        }

        return $roles;
    }
}
