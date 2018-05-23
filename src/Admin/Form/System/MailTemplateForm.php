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

namespace App\Admin\Form\System;

use App\Admin\Entity\System\MailTemplate;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Intl\Intl;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Mail Template Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class MailTemplateForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // Get Language List
        $allLanguages = Intl::getLanguageBundle()->getLanguageNames();
        $languageList = array_flip(array_intersect_key($allLanguages, array_flip($options['container']->getParameter('active_language'))));

        $builder
            ->add('contentId', TextType::class, [
                'label' => 'mail_contentid',
                'label_attr' => ['info' => 'mail_contentid_info'],
                'disabled' => $options['contentId_disable'],
            ])
            ->add('language', ChoiceType::class, [
                'label' => 'mail_language',
                'choices' => $languageList,
                'choice_translation_domain' => false,
                'empty_data' => 'tr',
                'required' => true,
            ])
            ->add('subject', TextType::class, [
                'label' => 'mail_subject',
            ])
            ->add('template', TextareaType::class, [
                'label' => 'mail_template_content',
                'label_attr' => ['info' => 'mail_template_content_info'],
                'required' => false,
                'empty_data' => '',
            ])
            ->add('fromName', TextType::class, [
                'label' => 'mail_from_name',
                'required' => false,
            ])
            ->add('fromEmail', EmailType::class, [
                'label' => 'mail_from_email',
                'required' => false,
            ])
            ->add('status', CheckboxType::class, [
                'label' => 'enable',
                'required' => false,
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
        $resolver
            ->setDefaults([
                'data_class' => MailTemplate::class,
            ])
            ->setRequired(['contentId_disable', 'container']);
    }
}
