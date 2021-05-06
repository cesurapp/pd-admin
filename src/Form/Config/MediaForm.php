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

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Media Settings Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class MediaForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('media_optimize', ChoiceType::class, [
                'label' => 'media_optimize',
                'help' => 'media_optimize_info',
                'choices' => [
                    'enable' => 1,
                    'disable' => 0,
                ],
                'empty_data' => '1',
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('media_max_height', IntegerType::class, [
                'label' => 'media_max_height',
                'help' => 'media_max_height_info',
                'empty_data' => '1024',
                'attr' => ['placeholder-nt' => '1024'],
                'required' => false,
            ])
            ->add('media_max_width', IntegerType::class, [
                'label' => 'media_max_width',
                'help' => 'media_max_width_info',
                'empty_data' => '768',
                'attr' => ['placeholder-nt' => '768'],
                'required' => false,
            ])
            ->add('media_quality', RangeType::class, [
                'label' => 'media_quality',
                'help' => 'media_quality_info',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
                'empty_data' => '80',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }
}
