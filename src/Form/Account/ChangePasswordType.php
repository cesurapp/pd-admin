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
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints\Length;

/**
 * Profile -> Change Password Type.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class ChangePasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('current_password', PasswordType::class, [
                'label' => 'security.password_current',
                'mapped' => false,
                'constraints' => new UserPassword(),
            ])
            ->add('plainPassword', RepeatedType::class, [
                'mapped' => false,
                'type' => PasswordType::class,
                'first_options' => ['label' => 'security.password'],
                'second_options' => ['label' => 'security.password_confirmation'],
                'constraints' => [
                    new Length([
                        'min' => 6,
                        'max' => 4096,
                    ]),
                ],
                'invalid_message' => 'password_dont_match',
            ])
            ->add('Submit', SubmitType::class, [
                'label' => 'button.save',
            ]);

        // Remove Current Password
        if ($options['disable_current_password']) {
            $builder->remove('current_password');
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('disable_current_password');
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
