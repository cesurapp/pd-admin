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

use App\Admin\Form\Type\ConfigAbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Core Settings Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class CoreForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('active_language', LanguageType::class, [
                'label' => 'active_language',
                'help' => 'active_language_info',
                'multiple' => true,
                'preferred_choices' => [
                    'tr', 'en', 'de', 'fr', 'ru', 'ar', 'es', 'sv', 'no', 'ga',
                ],
            ])
            ->add('list_count', RangeType::class, [
                'label' => 'list_count',
                'help' => 'list_count_info',
                'empty_data' => '25',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
            ])
            ->add('remember_time', IntegerType::class, [
                'label' => 'remember_time',
                'help' => 'remember_time_info',
                'empty_data' => '604800',
                'required' => false,
            ])
            ->add('twig_cache', ChoiceType::class, [
                'label' => 'twig_cache',
                'help' => 'twig_cache_info',
                'choices' => [
                    'enable' => '%kernel.cache_dir%/twig',
                    'disable' => false,
                ],
                'multiple' => false,
                'expanded' => true,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }
}
