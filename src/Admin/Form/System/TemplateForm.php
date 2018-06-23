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
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Yaml\Yaml;

/**
 * Contact Form.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class TemplateForm extends ConfigAbstractType
{
    /**
     * Create Form.
     *
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // Find Templates
        $templateAdmin = $this->loadTemplateList($options['container'], 'templates/Admin');
        $templateAuth = $this->loadTemplateList($options['container'], 'templates/Auth');

        $builder
            // Template Admin
            ->add('template_admin', ChoiceType::class, [
                'label' => 'template_admin',
                'choices' => $templateAdmin['templates'],
                'choice_translation_domain' => false
            ])
            ->add('template_admin_color_css', ChoiceType::class, [
                'label' => 'template_admin_color',
                'choice_translation_domain' => false
            ])
            ->add('template_admin_form_themes', HiddenType::class, [
                'label' => false
            ])
            // Template Auth
            ->add('template_auth', ChoiceType::class, [
                'label' => 'template_auth',
                'choices' => $templateAuth['templates'],
                'choice_translation_domain' => false
            ])
            ->add('template_auth_color_css', ChoiceType::class, [
                'label' => 'template_auth_color',
                'choice_translation_domain' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);

        $builder->addEventListener(FormEvents::POST_SET_DATA, function (FormEvent $event) use ($templateAdmin, $templateAuth, $options) {
            $form = $event->getForm();

            $form
                ->add('template_admin_color_css', ChoiceType::class, [
                    'label' => 'template_auth_color',
                    'choices' => $templateAdmin['config'][$form->get('template_auth')->getData()]['color'] ?? [],
                    'choice_translation_domain' => false
                ])
                ->add('template_auth_color_css', ChoiceType::class, [
                    'label' => 'template_auth_color',
                    'choices' => $templateAuth['config'][$form->get('template_auth')->getData()]['color'] ?? [],
                    'choice_translation_domain' => false
                ]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(['container']);
    }

    /**
     * Load Template List
     *
     * @param ContainerInterface $container
     * @param null $path
     * @return array
     */
    private function loadTemplateList(ContainerInterface $container, $path = null)
    {
        $path = $container->getParameter('kernel.project_dir') . '/' . $path;

        if (file_exists($path)) {
            $handle = opendir($path);
            $themeList = [];
            $configList = [];
            if ($handle) {
                while (false !== ($name = readdir($handle))) {
                    if (!in_array($name, ['.', '..', '.DS_Store'], true) && file_exists($config = $path . '/' . $name . '/config.yaml')) {
                        $themeConfig = (new Yaml())->parseFile($config);
                        $themeList[$themeConfig['theme']['name']] = $name;
                        $configList[$name] = $themeConfig;
                    }
                }
            }
            closedir($handle);

            return [
                'templates' => $themeList,
                'config' => $configList
            ];
        }

        return [
            'templates' => [],
            'config' => []
        ];
    }
}
