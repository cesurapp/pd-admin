<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pdAdmin
 *
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2018 pdAdmin
 * @license     LICENSE
 *
 * @link        https://github.com/rmznpydn/pd-admin
 */

namespace App\Admin\Services;

use App\Admin\Entity\Account\User;
use Doctrine\Common\Annotations\AnnotationReader;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Get All Metod Permissions.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class Security
{
    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Get ACL Roles.
     *
     * @return array
     */
    public function getACL(): array
    {
        // Default Roles
        $roles = [
            User::ROLE_DEFAULT => User::ROLE_DEFAULT,
            User::ROLE_ADMIN => User::ROLE_ADMIN,
            User::ROLE_ALL_ACCESS => User::ROLE_ALL_ACCESS,
        ];

        return $roles;
    }

    /**
     * Get All Method Roles.
     *
     * @throws \Doctrine\Common\Annotations\AnnotationException
     * @throws \ReflectionException
     *
     * @return array
     */
    public function getRoles(): array
    {
        // Get All Routes
        $routes = $this->container->get('router')->getRouteCollection()->all();

        // Annotation Reader
        $reader = new AnnotationReader();

        // Role Store
        $roles = [];

        foreach ($routes as $route) {
            // Check Action
            if (isset($route->getDefaults()['_controller']) && (2 === \count($controller = explode('::', $route->getDefaults()['_controller'])))) {
                if (!class_exists($controller[0])) {
                    continue;
                }

                // Class Reflection
                $reflection = new \ReflectionClass($controller[0]);

                // Find Class Method
                if (!$reflection->hasMethod($controller[1])) {
                    continue;
                }

                // Read Method Annotation
                $annotation = $reader->getMethodAnnotations($reflection->getMethod($controller[1]));

                if ($annotation) {
                    foreach ($annotation as $access) {
                        if ($access instanceof IsGranted) {
                            $roleObject = explode('_', $access->getAttributes());
                            if (3 === \count($roleObject)) {
                                $access = $roleObject[2];
                                $roleObject = $roleObject[0].'_'.$roleObject[1];

                                if (isset($roles[$roleObject])) {
                                    $roles[$roleObject][$access] = $roleObject.'_'.$access;
                                } else {
                                    $roles[$roleObject] = [$access => $roleObject.'_'.$access];
                                }
                            }
                        }
                    }
                }
            }
        }

        return $roles;
    }
}
