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
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TimezoneType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Core Settings Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class CoreForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('active_language', LanguageType::class, [
                'label' => 'active_language',
                'label_attr' => ['info' => 'active_language_info'],
                'multiple' => true,
                'preferred_choices' => [
                    'tr', 'en', 'de', 'fr', 'ru', 'ar', 'es', 'sv', 'no', 'ga',
                ],
            ])
            ->add('list_count', RangeType::class, [
                'label' => 'list_count',
                'label_attr' => ['info' => 'list_count_info'],
                'empty_data' => '25',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
            ])
            ->add('remember_time', IntegerType::class, [
                'label' => 'remember_time',
                'label_attr' => ['info' => 'remember_time_info'],
                'empty_data' => '604800',
                'required' => false,
            ])
            ->add('twig_cache', ChoiceType::class, [
                'label' => 'twig_cache',
                'label_attr' => ['info' => 'twig_cache_info'],
                'choices' => [
                    'enable' => '%kernel.cache_dir%/twig',
                    'disable' => false,
                ],
                'multiple' => false,
                'expanded' => true,
            ])
            ->add('model_timezone', TimezoneType::class, [
                'label' => 'model_timezone',
                'label_attr' => ['info' => 'model_timezone_info'],
                'preferred_choices' => ['UTC', date_default_timezone_get()],
                'placeholder' => 'Default',
                'empty_data' => null,
                'required' => false,
            ])
            ->add('view_timezone', TimezoneType::class, [
                'label' => 'view_timezone',
                'label_attr' => ['info' => 'view_timezone_info'],
                'preferred_choices' => ['UTC', date_default_timezone_get()],
                'placeholder' => 'Default',
                'empty_data' => null,
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }
}
