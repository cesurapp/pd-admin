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

use App\Auth\Entity\Profile;
use App\Auth\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => ['placeholder' => 'security.email'],
                'label_attr' => ['style' => 'display:none'],
                'label' => false,
            ])
            ->add('plainPassword', RepeatedType::class, [
                'mapped' => false,
                'type' => PasswordType::class,
                'first_options' => [
                    'attr' => ['placeholder' => 'security.password'],
                    'label_attr' => ['style' => 'display:none'],
                    'label' => false,
                ],
                'second_options' => [
                    'attr' => ['placeholder' => 'security.password_confirmation'],
                    'label_attr' => ['style' => 'display:none'],
                    'label' => false,
                ],
                'constraints' => [
                    new Length([
                        'min' => 3,
                        'max' => 4096,
                    ]),
                ],
                'invalid_message' => 'password_dont_match',
            ]);

        // Add Profile
        $builder->add($builder
            ->create('profile', FormType::class, [
                'data_class' => Profile::class,
                'label' => false,
                'attr' => ['class' => 'col-12'],
            ])
            ->add('firstname', TextType::class, [
                'label_attr' => ['style' => 'display:none'],
                'label' => false,
                'attr' => ['placeholder' => 'firstname'],
            ])
            ->add('lastname', TextType::class, [
                'label_attr' => ['style' => 'display:none'],
                'label' => false,
                'attr' => ['placeholder' => 'lastname'],
            ])
            ->add('phone', TextType::class, [
                'label_attr' => ['style' => 'display:none'],
                'label' => false,
                'attr' => ['placeholder' => 'phone'],
                'required' => false,
            ])
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
