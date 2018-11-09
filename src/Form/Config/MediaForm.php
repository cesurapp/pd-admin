<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 *
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 *
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Config;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;

/**
 * Media Settings Form.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class MediaForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('media_library', ChoiceType::class, [
                'label' => 'media_library',
                'help' => 'media_library_info',
                'choices' => $this->getImageExtension(),
                'empty_data' => 'gd',
                'choice_translation_domain' => false,
            ])
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
            ->add('media_watermark', ChoiceType::class, [
                'label' => 'media_watermark',
                'help' => 'media_watermark_info',
                'choices' => [
                    'watermark_text' => 'text',
                    'watermark_image' => 'image',
                    'disable' => 0,
                ],
                'empty_data' => '0',
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('media_wm_image', FileType::class, [
                'label' => 'media_wm_image',
                'help' => 'media_wm_image_info',
                'attr' => [
                    'label' => 'upload_image_btn',
                    'label_class' => 'btn btn-success',
                ],
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '3M',
                    ]),
                    new Image([
                        'mimeTypes' => [
                            'image/jpeg', 'image/jpg', 'image/png',
                        ],
                    ]),
                ],
                'required' => false,
            ])
            ->add('media_wm_image_position', ChoiceType::class, [
                'label' => 'media_wm_image_position',
                'help' => 'media_wm_image_position_info',
                'choices' => [
                    'top' => 'top',
                    'top_left' => 'top-left',
                    'top_right' => 'top-right',
                    'bottom' => 'bottom',
                    'bottom_left' => 'bottom-left',
                    'bottom_right' => 'bottom-right',
                    'left' => 'left',
                    'right' => 'right',
                    'center' => 'center',
                ],
                'empty_data' => 'top-left',
                'required' => false,
                'placeholder' => false,
            ])
            ->add('media_wm_image_x', RangeType::class, [
                'label' => 'media_wm_image_x',
                'help' => 'media_wm_image_x_info',
                'attr' => [
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.01,
                ],
                'empty_data' => '0',
                'required' => false,
            ])
            ->add('media_wm_image_y', RangeType::class, [
                'label' => 'media_wm_image_y',
                'help' => 'media_wm_image_y_info',
                'attr' => [
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.01,
                ],
                'empty_data' => '0',
                'required' => false,
            ])
            ->add('media_wm_font', FileType::class, [
                'label' => 'media_wm_font',
                'help' => 'media_wm_font_info',
                'attr' => [
                    'label' => 'upload_font_btn',
                    'label_class' => 'btn btn-success',
                ],
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '3M',
                        'mimeTypes' => [
                            'application/x-font-ttf', 'application/opentype',
                        ],
                    ]),
                ],
                'required' => false,
            ])
            ->add('media_wm_font_text', TextType::class, [
                'label' => 'media_wm_font_text',
                'empty_data' => 'pdAdmin',
                'attr' => ['placeholder-nt' => 'pdAdmin'],
                'required' => false,
            ])
            ->add('media_wm_font_size', IntegerType::class, [
                'label' => 'media_wm_font_size',
                'help' => 'media_wm_font_size_info',
                'empty_data' => '36',
                'attr' => ['placeholder-nt' => '36'],
                'required' => false,
            ])
            ->add('media_wm_font_color', TextType::class, [
                'label' => 'media_wm_font_color',
                'help' => 'media_wm_font_color_info',
                'empty_data' => '#445160',
                'attr' => ['placeholder-nt' => '#445160'],
                'required' => false,
            ])
            ->add('media_wm_font_align', ChoiceType::class, [
                'label' => 'media_wm_font_align',
                'help' => 'media_wm_font_align_info',
                'choices' => [
                    'left' => 'left',
                    'right' => 'right',
                    'center' => 'center',
                ],
                'empty_data' => 'left',
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('media_wm_font_valign', ChoiceType::class, [
                'label' => 'media_wm_font_valign',
                'help' => 'media_wm_font_valign_info',
                'choices' => [
                    'top' => 'top',
                    'bottom' => 'bottom',
                    'middle' => 'middle',
                ],
                'empty_data' => 'bottom',
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('media_wm_font_x', RangeType::class, [
                'label' => 'media_wm_font_x',
                'help' => 'media_wm_font_x_info',
                'attr' => [
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.01,
                ],
                'empty_data' => '0.5',
                'required' => false,
            ])
            ->add('media_wm_font_y', RangeType::class, [
                'label' => 'media_wm_font_y',
                'help' => 'media_wm_font_y_info',
                'attr' => [
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.01,
                ],
                'empty_data' => '0.5',
                'required' => false,
            ])
            ->add('media_wm_font_angle', RangeType::class, [
                'label' => 'media_wm_font_angle',
                'help' => 'media_wm_font_angle_info',
                'attr' => [
                    'min' => 0,
                    'max' => 360,
                    'step' => 1,
                ],
                'empty_data' => '45',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }

    /**
     * Check & Get Image Extension.
     *
     * @return array
     */
    private function getImageExtension()
    {
        // Extensions
        $extension = [];

        // Check GD Library
        if (\extension_loaded('gd')) {
            $extension['gd'] = 'GD Library';
        }

        // Check Imagick Library
        if (\extension_loaded('imagick')) {
            $extension['imagick'] = 'Imagick Library';
        }

        return array_flip($extension);
    }
}
