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
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Intl\Intl;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\Length;

/**
 * General Settings Form.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class GeneralForm extends ConfigAbstractType
{
    /**
     * Create Form.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // Get Language List
        $allLanguages = Intl::getLanguageBundle()->getLanguageNames();
        $languageList = array_flip(array_intersect_key($allLanguages, array_flip($options['container']->get('parameter_bag')->get('active_language'))));

        $builder
            ->add('head_title', TextType::class, [
                'label' => 'head_title',
                'help' => 'head_title_info',
                'constraints' => [
                    new Length([
                        'max' => 150,
                    ]),
                ],
                'empty_data' => 'pdAdmin',
                'attr' => ['placeholder-nt' => 'pdAdmin'],
                'required' => false,
            ])
            ->add('head_title_pattern', TextType::class, [
                'label' => 'head_title_pattern',
                'help' => 'head_title_pattern_info',
                'constraints' => [
                    new Length([
                        'max' => 150,
                    ]),
                ],
                'empty_data' => '&T - &P',
                'attr' => ['placeholder-nt' => '&T - &P'],
                'required' => false,
            ])
            ->add('head_description', TextareaType::class, [
                'label' => 'head_description',
                'help' => 'head_description_info',
                'constraints' => [
                    new Length([
                        'max' => 200,
                    ]),
                ],
                'empty_data' => 'pdAdmin Head Description',
                'attr' => ['placeholder-nt' => 'pdAdmin Head Description'],
                'required' => false,
            ])
            ->add('head_author', TextType::class, [
                'label' => 'head_author',
                'help' => 'head_author_info',
                'constraints' => [
                    new Length([
                        'max' => 150,
                    ]),
                ],
                'empty_data' => 'Kerem APAYDIN',
                'attr' => ['placeholder-nt' => 'Kerem APAYDIN'],
                'required' => false,
            ])
            ->add('head_keywords', TextareaType::class, [
                'label' => 'head_keywords',
                'constraints' => [
                    new Length([
                        'max' => 200,
                    ]),
                ],
                'attr' => ['placeholder-nt' => 'pdAdmin, Symfony, Dashboard'],
                'required' => false,
            ])
            ->add('footer_copyright', TextareaType::class, [
                'label' => 'footer_copyright',
                'constraints' => [
                    new Length([
                        'max' => 200,
                    ]),
                ],
                'empty_data' => 'pdAdmin Developed by Symfony 4',
                'attr' => ['placeholder-nt' => 'pdAdmin Developed by Symfony 4'],
                'required' => false,
            ])
            ->add('default_locale', ChoiceType::class, [
                'label' => 'default_locale',
                'choices' => $languageList,
                'choice_translation_domain' => false,
                'empty_data' => 'tr',
                'placeholder' => false,
                'required' => false,
            ])
            ->add('default_country', CountryType::class, [
                'label' => 'default_country',
                'choice_translation_domain' => false,
                'empty_data' => 'TR',
                'placeholder' => false,
                'required' => false,
            ])
            ->add('site_logo', FileType::class, [
                'label' => 'site_logo',
                'attr' => [
                    'label' => 'upload_image_btn',
                    'label_class' => 'btn btn-success',
                ],
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
                    ]),
                ],
            ])
            ->add('site_favicon', FileType::class, [
                'label' => 'site_favicon',
                'attr' => [
                    'label' => 'upload_image_btn',
                    'label_class' => 'btn btn-success',
                ],
                'required' => false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '3M',
                    ]),
                    new Image([
                        'mimeTypes' => [
                            'image/x-icon', 'image/png',
                        ],
                    ]),
                ],
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
}
