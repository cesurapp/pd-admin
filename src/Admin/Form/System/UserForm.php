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
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * User Settings Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class UserForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user_registration', CheckboxType::class, [
                'label' => 'user_registration',
                'label_attr' => ['info' => 'user_registration_info'],
                'required' => false,
            ])
            ->add('user_default_group', EntityType::class, [
                'label' => 'user_default_group',
                'label_attr' => ['info' => 'user_default_group_info'],
                'choice_translation_domain' => false,
                'class' => Group::class,
                'choice_label' => 'name',
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_login_redirect', ChoiceType::class, [
                'label' => 'user_login_redirect',
                'label_attr' => ['info' => 'user_login_redirect_info'],
                'choices' => $this->getAllRouter($options['container']),
                'choice_translation_domain' => false,
                'empty_data' => 'admin_dashboard',
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_logout_redirect', ChoiceType::class, [
                'label' => 'user_logout_redirect',
                'label_attr' => ['info' => 'user_logout_redirect_info'],
                'choices' => $this->getAllRouter($options['container']),
                'choice_translation_domain' => false,
                'empty_data' => 'fos_user_security_login',
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_email_confirmation', CheckboxType::class, [
                'label' => 'user_email_confirmation',
                'label_attr' => ['info' => 'user_email_confirmation_info'],
                'required' => false,
            ])
            ->add('user_welcome_email', CheckboxType::class, [
                'label' => 'user_welcome_email',
                'label_attr' => ['info' => 'user_welcome_email_info'],
                'required' => false,
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
        $resolver->setRequired('container');
    }

    /**
     * Return All Router.
     *
     * @param ContainerInterface $container
     *
     * @return array
     */
    public function getAllRouter(ContainerInterface $container)
    {
        // Get Router Collection
        $router = $container->get('router')->getRouteCollection()->all();
        $routerList = [];

        // Set Route Name => Path
        foreach ($router as $name => $route) {
            if (!mb_stristr($name, '_profiler') && !mb_stristr($name, '_wdt') && !mb_stristr($name, '_twig')) {
                $routerList[$name] = $route->getPath();
            }
        }

        // Return
        return array_flip($routerList);
    }
}
