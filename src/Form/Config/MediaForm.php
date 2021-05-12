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

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Media Settings Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class MediaForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('media_optimize', CheckboxType::class, [
                'label' => 'config.media.optimize',
                'label_attr' => ['class' => 'checkbox-switch'],
                'help' => 'config.media.optimize_help',
                'required' => false,
            ])
            ->add('media_max_height', IntegerType::class, [
                'label' => 'config.media.max_height',
                'help' => 'config.media.max_height_help',
                'empty_data' => '1920',
                'attr' => ['placeholder-nt' => '1920'],
                'required' => false,
            ])
            ->add('media_max_width', IntegerType::class, [
                'label' => 'config.media.max_width',
                'help' => 'config.media.max_width_help',
                'empty_data' => '1080',
                'attr' => ['placeholder-nt' => '1080'],
                'required' => false,
            ])
            ->add('media_quality', RangeType::class, [
                'label' => 'config.media.quality',
                'help' => 'config.media.quality_help',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
                'empty_data' => '80',
                'required' => false
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'button.save',
                'validate' => false
            ]);
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
