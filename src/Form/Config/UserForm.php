<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Config;

use App\Entity\Account\Group;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;

/**
 * User Settings Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class UserForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user_registration', CheckboxType::class, [
                'label' => 'user_registration',
                'help' => 'user_registration_info',
                'required' => false,
            ])
            ->add('user_default_group', EntityType::class, [
                'label' => 'user_default_group',
                'help' => 'user_default_group_info',
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_login_redirect', ChoiceType::class, [
                'label' => 'user_login_redirect',
                'help' => 'user_login_redirect_info',
                'choices' => $this->getAllRouter($options['router']),
                'empty_data' => 'admin_dashboard',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_logout_redirect', ChoiceType::class, [
                'label' => 'user_logout_redirect',
                'help' => 'user_logout_redirect_info',
                'choices' => $this->getAllRouter($options['router']),
                'empty_data' => 'fos_user_security_login',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_email_confirmation', CheckboxType::class, [
                'label' => 'user_email_confirmation',
                'help' => 'user_email_confirmation_info',
                'required' => false,
            ])
            ->add('user_welcome_email', CheckboxType::class, [
                'label' => 'user_welcome_email',
                'help' => 'user_welcome_email_info',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }

    /**
     * Form Default Options.
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('router');
    }

    /**
     * Return All Router.
     */
    public function getAllRouter(RouterInterface $router): array
    {
        // Get Router Collection
        $allRouter = $router->getRouteCollection()->all();
        $routerList = [];

        // Set Route Name => Path
        foreach ($allRouter as $name => $route) {
            if (!mb_stristr($name, '_profiler') && !mb_stristr($name, '_wdt') && !mb_stristr($name, '_twig')) {
                $routerList[$name] = $route->getPath();
            }
        }

        // Return
        return array_flip($routerList);
    }
}
