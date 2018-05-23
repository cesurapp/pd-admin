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

namespace App\Auth\Form;

use App\Auth\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Intl\Intl;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Profile Form Type.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class ProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // Add Email
        $builder->add('email', EmailType::class, [
                'label' => 'security.email',
            ]
        );

        // Add Profile Section
        $builder->add(
            $builder
                ->create('profile', FormType::class, [
                    'label' => false,
                    'attr' => ['class' => 'col-12'],
                    'data_class' => 'App\Auth\Entity\Profile',
                ])
                ->add('firstname', TextType::class, [
                    'label' => 'firstname',
                ])
                ->add('lastname', TextType::class, [
                    'label' => 'lastname',
                ])
                ->add('phone', IntegerType::class, [
                    'label' => 'phone',
                    'required' => false,
                ])
                ->add('website', TextType::class, [
                    'label' => 'website',
                    'required' => false,
                ])
                ->add('company', TextType::class, [
                    'label' => 'company',
                    'required' => false,
                ])
                ->add('language', ChoiceType::class, [
                    'label' => 'language',
                    'choices' => $this->getLanguageList($options['container']),
                    'choice_translation_domain' => false,
                    'attr' => ['v-select' => 'true'],
                ])
        );

        // Add Admin Item
        $this->setAdminItem($builder, $options);

        // Add Submit
        $builder->add('submit', SubmitType::class, [
            'label' => 'save',
        ]);
    }

    /**
     * Set Default Options.
     *
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'data_class' => User::class,
            ])
            ->setRequired('container');
    }

    /**
     * Add Admin Item.
     *
     * @param FormBuilderInterface $builder
     * @param $options
     */
    public function setAdminItem(FormBuilderInterface &$builder, $options)
    {
        if ($options['container']->get('security.authorization_checker')->isGranted(User::ROLE_ALL_ACCESS)) {
            $builder
                ->add('createdAt', DateTimeType::class, [
                    'label' => 'created_at',
                    'format' => 'yyyy-MM-dd HH:mm',
                    'model_timezone' => $options['container']->getParameter('model_timezone'),
                    'view_timezone' => $options['container']->getParameter('view_timezone'),
                    'widget' => 'single_text',
                    'html5' => true,
                    'attr' => ['data-picker' => 'datetime'],
                ]);
        }
    }

    /**
     * Return Active Language List.
     *
     * @param ContainerInterface $container
     *
     * @return array|bool
     */
    public function getLanguageList(ContainerInterface $container)
    {
        $allLanguages = Intl::getLanguageBundle()->getLanguageNames();
        $languageList = array_flip(array_intersect_key($allLanguages, array_flip($container->getParameter('active_language'))));

        return $languageList;
    }
}
