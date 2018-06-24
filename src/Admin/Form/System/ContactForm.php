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
 * @link        https://github.com/rmznpydn/pd-admin
 */

namespace App\Admin\Form\System;

use App\Admin\Form\Type\ConfigAbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Contact Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class ContactForm extends ConfigAbstractType
{
    /**
     * Create Form.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('contact_email', EmailType::class, [
                'label' => 'contact_email',
                'help' => 'contact_email_info',
                'attr' => ['placeholder-nt' => 'example@emlakpro.net'],
                'required' => true,
            ])
            ->add('contact_phone', TextType::class, [
                'label' => 'contact_phone',
                'attr' => ['placeholder-nt' => '+0850 209 6399'],
                'required' => false,
            ])
            ->add('contact_mobile_phone', TextType::class, [
                'label' => 'contact_mobile_phone',
                'attr' => ['placeholder-nt' => '+0850 209 6399'],
                'required' => false,
            ])
            ->add('contact_fax_number', TextType::class, [
                'label' => 'contact_fax_number',
                'attr' => ['placeholder-nt' => '+0850 209 6399'],
                'required' => false,
            ])
            ->add('contact_address', TextareaType::class, [
                'label' => 'contact_address',
                'required' => false,
            ])
            ->add('contact_facebook', UrlType::class, [
                'label' => 'contact_facebook',
                'attr' => ['placeholder-nt' => 'https://www.facebook.com/writelnas'],
                'required' => false,
            ])
            ->add('contact_twitter', UrlType::class, [
                'label' => 'contact_twitter',
                'attr' => ['placeholder-nt' => 'https://www.twitter.com/writelnas'],
                'required' => false,
            ])
            ->add('contact_google', UrlType::class, [
                'label' => 'contact_google',
                'attr' => ['placeholder-nt' => 'https://plus.google.com'],
                'required' => false,
            ])
            ->add('contact_youtube', UrlType::class, [
                'label' => 'contact_youtube',
                'attr' => ['placeholder-nt' => 'https://www.youtube.com'],
                'required' => false,
            ])
            ->add('contact_linkedin', UrlType::class, [
                'label' => 'contact_linkedin',
                'attr' => ['placeholder-nt' => 'https://www.linkedin.com'],
                'required' => false,
            ])
            ->add('contact_whatsapp', NumberType::class, [
                'label' => 'contact_whatsapp',
                'attr' => ['placeholder-nt' => '+0850 209 6399'],
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }
}
