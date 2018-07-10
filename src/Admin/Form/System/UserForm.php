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

namespace App\Admin\Form\System;

use App\Admin\Entity\Account\Group;
use App\Admin\Form\Type\ConfigAbstractType;
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
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class UserForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user_registration', CheckboxType::class, [
                'label' => 'user_registration',
                'help' => 'user_registration_info',
                'required' => false
            ])
            ->add('user_default_group', EntityType::class, [
                'label' => 'user_default_group',
                'help' => 'user_default_group_info',
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false
            ])
            ->add('user_login_redirect', ChoiceType::class, [
                'label' => 'user_login_redirect',
                'help' => 'user_login_redirect_info',
                'choices' => $this->getAllRouter($options['router']),
                'empty_data' => 'admin_dashboard',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false
            ])
            ->add('user_logout_redirect', ChoiceType::class, [
                'label' => 'user_logout_redirect',
                'help' => 'user_logout_redirect_info',
                'choices' => $this->getAllRouter($options['router']),
                'empty_data' => 'fos_user_security_login',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false
            ])
            ->add('user_email_confirmation', CheckboxType::class, [
                'label' => 'user_email_confirmation',
                'help' => 'user_email_confirmation_info',
                'required' => false
            ])
            ->add('user_welcome_email', CheckboxType::class, [
                'label' => 'user_welcome_email',
                'help' => 'user_welcome_email_info',
                'required' => false
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }

    /**
     * Form Default Options.
     *
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('router');
    }

    /**
     * Return All Router.
     *
     * @param RouterInterface $router
     *
     * @return array
     */
    public function getAllRouter(RouterInterface $router)
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
