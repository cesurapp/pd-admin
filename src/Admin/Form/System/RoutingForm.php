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
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Admin\Form\System;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Settings Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class RoutingForm extends AbstractType
{
    /**
     * Create Form.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('routing_admin', TextType::class, [
                'label' => 'routing_admin',
                'label_attr' => ['info' => 'routing_admin_info'],
                'attr' => ['placeholder-nt' => 'admin'],
                'empty_data' => 'admin',
            ])
            ->add('routing_login', TextType::class, [
                'label' => 'routing_login',
                'label_attr' => ['info' => 'routing_login_info'],
                'attr' => ['placeholder-nt' => 'auth/login'],
                'empty_data' => 'login',
            ])
            ->add('routing_logout', TextType::class, [
                'label' => 'routing_logout',
                'label_attr' => ['info' => 'routing_logout_info'],
                'attr' => ['placeholder-nt' => 'auth/logout'],
                'empty_data' => 'logout',
            ])
            ->add('routing_register', TextType::class, [
                'label' => 'routing_register',
                'label_attr' => ['info' => 'routing_register_info'],
                'attr' => ['placeholder-nt' => 'auth/register'],
                'empty_data' => 'register',
            ])
            ->add('routing_resetting', TextType::class, [
                'label' => 'routing_resetting',
                'label_attr' => ['info' => 'routing_resetting_info'],
                'attr' => ['placeholder-nt' => 'auth/forgot_password'],
                'empty_data' => 'forgot_password',
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }
}
