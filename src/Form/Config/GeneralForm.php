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
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Intl\Languages;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\Length;

/**
 * General Settings Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class GeneralForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('head_title', TextType::class, [
                'label' => 'config.general.head_title',
                'help' => 'config.general.head_title_help',
                'constraints' => [new Length(['max' => 150])],
                'empty_data' => 'pdAdmin',
                'attr' => ['placeholder-nt' => 'pdAdmin'],
                'required' => false
            ])
            ->add('head_title_pattern', TextType::class, [
                'label' => 'config.general.head_title_pattern',
                'help' => 'config.general.head_title_pattern_help',
                'constraints' => [new Length(['max' => 150])],
                'empty_data' => '&T - &P',
                'attr' => ['placeholder-nt' => '&T - &P'],
                'required' => false,
            ])
            ->add('head_description', TextareaType::class, [
                'label' => 'config.general.head_description',
                'help' => 'config.general.head_description_help',
                'constraints' => [new Length(['max' => 200])],
                'empty_data' => 'pdAdmin Head Description',
                'attr' => ['placeholder-nt' => 'pdAdmin Head Description'],
                'required' => false,
            ])
            ->add('head_author', TextType::class, [
                'label' => 'config.general.head_author',
                'help' => 'config.general.head_author_help',
                'constraints' => [new Length(['max' => 150])],
                'empty_data' => 'Ramazan APAYDIN',
                'attr' => ['placeholder-nt' => 'Ramazan APAYDIN'],
                'required' => false,
            ])
            ->add('head_keywords', TextareaType::class, [
                'label' => 'config.general.head_keywords',
                'constraints' => [new Length(['max' => 200])],
                'attr' => ['placeholder-nt' => 'pdAdmin, Symfony, Dashboard'],
                'required' => false,
            ])
            ->add('footer_copyright', TextareaType::class, [
                'label' => 'config.general.footer_copyright',
                'constraints' => [new Length(['max' => 200])],
                'empty_data' => 'pdAdmin Developed by Symfony 5',
                'attr' => ['placeholder-nt' => 'pdAdmin Developed by Symfony 5'],
                'required' => false,
            ])
            ->add('default_locale', ChoiceType::class, [
                'label' => 'config.general.default_locale',
                'choices' => array_flip(array_intersect_key(Languages::getNames(), array_flip($options['active_language']))),
                'choice_translation_domain' => false,
                'empty_data' => 'tr',
                'placeholder' => 'Dil Seçin',
                'required' => false,
            ])
            ->add('list_count', RangeType::class, [
                'label' => 'config.general.list_count',
                'help' => 'config.general.list_count_help',
                'attr' => [
                    'min' => 1,
                    'max' => 100,
                    'step' => 1,
                ],
                'empty_data' => '30',
                'required' => false,
            ])
            ->add('site_logo', FileType::class, [
                'label' => 'config.general.site_logo',
                'required' => false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '10M',
                    ]),
                    new Image([
                        'mimeTypes' => [
                            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml',
                        ],
                    ])
                ]
            ])
            ->add('site_favicon', FileType::class, [
                'label' => 'config.general.site_favicon',
                'required' => false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '3M',
                    ]),
                    new Image([
                        'mimeTypes' => [
                            'image/x-icon', 'image/vnd.microsoft.icon', 'image/png',
                        ],
                    ])
                ]
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'button.save',
                'validate' => false
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('active_language');
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
