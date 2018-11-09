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
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Email Settings Forms.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class EmailForm extends ConfigAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('mail_disable_delivery', ChoiceType::class, [
                'label' => 'mail_disable_delivery',
                'help' => 'mail_disable_delivery_info',
                'choices' => [
                    'enable' => 0,
                    'disable' => 1,
                ],
                'empty_data' => '0',
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('mail_transport', ChoiceType::class, [
                'label' => 'mail_transport',
                'help' => 'mail_transport_info',
                'choices' => [
                    'SMTP' => 'smtp',
                    'SendMail' => 'sendmail',
                    'Gmail' => 'gmail',
                ],
                'empty_data' => 'smtp',
                'choice_translation_domain' => false,
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('mail_host', TextType::class, [
                'label' => 'mail_host',
                'attr' => ['placeholder-nt' => 'mail.example.com'],
                'required' => false,
            ])
            ->add('mail_port', IntegerType::class, [
                'label' => 'mail_port',
                'help' => 'mail_port_info',
                'attr' => ['placeholder-nt' => '465 | 587'],
                'required' => false,
            ])
            ->add('mail_username', TextType::class, [
                'label' => 'mail_username',
                'help' => 'mail_username_info',
                'attr' => ['placeholder-nt' => 'mail@example.com'],
                'required' => false,
            ])
            ->add('mail_password', PasswordType::class, [
                'label' => 'mail_password',
                'help' => 'mail_password_info',
                'attr' => ['placeholder-nt' => '**********'],
                'required' => false,
            ])
            ->add('mail_timeout', IntegerType::class, [
                'label' => 'mail_timeout',
                'help' => 'mail_timeout_info',
                'attr' => ['placeholder-nt' => '30'],
                'empty_data' => '30',
                'required' => false,
            ])
            ->add('mail_encryption', ChoiceType::class, [
                'label' => 'mail_encryption',
                'help' => 'mail_encryption_info',
                'choices' => [
                    'TLS' => 'tls',
                    'SSL' => 'ssl',
                ],
                'choice_translation_domain' => false,
                'multiple' => false,
                'expanded' => true,
                'required' => false,
            ])
            ->add('mail_auth_mode', ChoiceType::class, [
                'label' => 'mail_auth_mode',
                'help' => 'mail_auth_mode_info',
                'choices' => [
                    'Plain' => 'plain',
                    'Login' => 'login',
                    'Cram-Md5' => 'cram-md5',
                ],
                'empty_data' => 'login',
                'choice_translation_domain' => false,
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('mail_allow_self_signed', ChoiceType::class, [
                'label' => 'mail_allow_self_signed',
                'help' => 'mail_allow_self_signed_info',
                'choices' => [
                    'enable' => 1,
                    'disable' => 0,
                ],
                'empty_data' => '0',
                'multiple' => false,
                'expanded' => true,
                'required' => false,
                'placeholder' => false,
            ])
            ->add('mail_verify_peer', ChoiceType::class, [
                'label' => 'mail_verify_peer',
                'help' => 'mail_verify_peer_info',
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
            ->add('mail_sender_address', EmailType::class, [
                'label' => 'mail_sender_address',
                'help' => 'mail_sender_address_info',
                'attr' => ['placeholder-nt' => 'mail@example.com'],
                'empty_data' => 'mail@example.com',
                'required' => false,
            ])
            ->add('mail_sender_name', TextType::class, [
                'label' => 'mail_sender_name',
                'help' => 'mail_sender_name_info',
                'attr' => ['placeholder-nt' => 'pdAdmin'],
                'empty_data' => 'pdAdmin',
                'required' => false,
            ])
            ->add('mail_test_address', EmailType::class, [
                'label' => 'mail_test_address',
                'help' => 'mail_test_address_info',
                'attr' => ['placeholder-nt' => 'mail@example.com'],
                'empty_data' => 'mail@example.com',
                'required' => false,
            ])
            ->add(
                $builder
                ->create('submit_group', FormType::class, [
                    'mapped' => false,
                    'label' => false,
                    'attr' => ['class' => 'ml-auto col-md-8 col-sm-8 col-xs-12'],
                ])
                ->add('submit', SubmitType::class, [
                    'label' => 'save',
                    'attr' => ['mbutton' => true],
                ])
                ->add('submitTest', SubmitType::class, [
                    'label' => 'test',
                    'attr' => ['mbutton' => true, 'class' => 'btn-warning'],
                ])
            );
    }
}
