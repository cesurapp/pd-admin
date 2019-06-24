<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Config;

use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Core Settings Form.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
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
                'empty_data' => ['tr', 'en'],
                'required' => false,
                'placeholder' => false,
            ])
            ->add('list_count', RangeType::class, [
                'label' => 'list_count',
                'help' => 'list_count_info',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
                'empty_data' => '30',
                'required' => false,
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
                'empty_data' => '%kernel.cache_dir%/twig',
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('admin_allow_ips', TextareaType::class, [
                'label' => 'admin_allow_ips',
                'help' => 'admin_allow_ips_info',
                'required' => false,
            ])
            ->add('auth_allow_ips', TextareaType::class, [
                'label' => 'auth_allow_ips',
                'help' => 'auth_allow_ips_info',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);

        // IPS Data Transformer
        $builder
            ->get('admin_allow_ips')
            ->addModelTransformer(new CallbackTransformer(
                static function ($ips) {
                    return implode(PHP_EOL, json_decode($ips, true) ?? []);
                },
                static function ($ips) {
                    return json_encode(array_map('trim', explode(PHP_EOL, $ips)));
                }
            ));
        $builder->get('auth_allow_ips')
            ->addModelTransformer(new CallbackTransformer(
                static function ($ips) {
                    return implode(PHP_EOL, json_decode($ips, true) ?? []);
                },
                static function ($ips) {
                    return json_encode(array_map('trim', explode(PHP_EOL, $ips)));
                }
            ));
    }
}
