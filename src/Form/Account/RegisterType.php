<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Account;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;

/**
 * User Register Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => ['placeholder' => 'security.email'],
                'label' => 'security.email',
            ])
            ->add('plainPassword', RepeatedType::class, [
                'mapped' => false,
                'type' => PasswordType::class,
                'first_options' => [
                    'attr' => ['placeholder' => 'security.password'],
                    'label' => 'security.password',
                ],
                'second_options' => [
                    'attr' => ['placeholder' => 'security.password_confirmation'],
                    'label' => 'security.password_confirmation',
                ],
                'constraints' => [
                    new Length([
                        'min' => 6,
                        'max' => 4096,
                    ]),
                ],
                'invalid_message' => 'password_dont_match',
            ]);
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
