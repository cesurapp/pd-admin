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

namespace App\Admin\Controller\System;

use App\Admin\Form\System\ContactForm;
use App\Admin\Form\System\CoreForm;
use App\Admin\Form\System\EmailForm;
use App\Admin\Form\System\GeneralForm;
use App\Admin\Form\System\MediaForm;
use App\Admin\Form\System\RoutingForm;
use App\Admin\Form\System\UserForm;
use App\Admin\Services\ConfigManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

/**
 * Controller managing the settings.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class SettingsController extends Controller
{
    /**
     * Settings Generals.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_GENERAL")
     */
    public function general(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_general');

        // Create Form
        $form = $this->createForm(GeneralForm::class, null, ['container' => $this->container]);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_settings_general');
        }

        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_general',
            'page_description' => 'settings_general_desc',
        ]);
    }

    /**
     * Settings Contact.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_CONTACT")
     */
    public function contact(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_contact');

        // Create Form
        $form = $this->createForm(ContactForm::class);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_contact',
            'page_description' => 'settings_contact_desc',
        ]);
    }

    /**
     * Settings Email.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_EMAIL")
     */
    public function email(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_email');

        // Create Form
        $form = $this->createForm(EmailForm::class);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Test Button is Clicked
            if ('submitTest' === $form->getClickedButton()->getName()) {
                $toEmail = $form->get('mail_test_address')->getData();

                // Send Mail
                if (null === $toEmail || empty($toEmail)) {
                    $this->addFlash('error', 'test_email_empty_address');
                } else {
                    // Test Message
                    $mailLogger = new \Swift_Plugins_Loggers_EchoLogger();
                    $message = (new \Swift_Message())
                        ->setFrom($form->get('mail_sender_address')->getData())
                        ->setTo($toEmail)
                        ->setSubject('EmlakPRO Test Email')
                        ->setBody('EmlakPRO Test Email!');

                    // Send Mail
                    $mail = $this->get('mailer');
                    $mail->registerPlugin(new \Swift_Plugins_LoggerPlugin($mailLogger));

                    if ($mail->send($message)) {
                        $this->addFlash('success', 'test_email_success');
                    } else {
                        $this->addFlash('error', 'test_email_error');
                    }
                    $mailLogger->dump();
                }
            } else {
                $cm->save($form);

                $this->addFlash('success', 'changes_saved');
            }
        }

        // Render
        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_email',
            'page_description' => 'settings_email_desc',
        ]);
    }

    /**
     * Settings Authentication.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_USER")
     */
    public function user(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_user');

        // Create Form
        $form = $this->createForm(UserForm::class, null, ['container' => $this->container]);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        // Render
        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_user',
            'page_description' => 'settings_user_desc',
        ]);
    }

    /**
     * Media Settings.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_MEDIA")
     */
    public function media(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_media');

        // Create Form
        $form = $this->createForm(MediaForm::class);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        // Render
        return $this->render('@Admin/System/Settings/media.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_media',
            'page_description' => 'settings_media_desc',
        ]);
    }

    /**
     * Load Template List
     *
     * @param null $path
     * @return array
     */
    private function loadTemplateList($path = null)
    {
        $path = $this->getParameter('kernel.project_dir') . '/' . $path;

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

    /**
     * Settings Template.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_TEMPLATE")
     */
    public function template(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_template');

        // Create Form
        $form = $this->createFormBuilder()
            ->add('template_admin', ChoiceType::class, [
                'label' => 'template_admin',
                'choices' => $this->loadTemplateList('templates/Admin')['templates'],
            ])
            ->add('template_auth', ChoiceType::class, [
                'label' => 'template_auth',
                'choices' => $this->loadTemplateList('templates/Auth')['templates'],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ])
            ->getForm();
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        // Render
        return $this->render('@Admin/System/Settings/template.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_template',
            'page_description' => 'settings_template_desc',
        ]);
    }

    /**
     * Settings Core.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_CORE")
     */
    public function core(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_core');

        // Create Form
        $form = $this->createForm(CoreForm::class);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        // Render
        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_core',
            'page_description' => 'settings_core_desc',
        ]);
    }

    /**
     * Settings Core Routing.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_SETTINGS_ROUTING")
     */
    public function routing(Request $request)
    {
        // Get Config Manager
        $cm = new ConfigManager($this->getDoctrine()->getManager(), $this->container, 'settings_routing');

        // Create Form
        $form = $this->createForm(RoutingForm::class);
        $cm->setFormData($form);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            $cm->save($form);

            $this->addFlash('success', 'changes_saved');
        }

        // Render
        return $this->render('@Admin/System/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_routing',
            'page_description' => 'settings_routing_desc',
        ]);
    }

    /**
     * Clear Symfony Cache.
     *
     * @IsGranted("ADMIN_SETTINGS_ROUTING")
     */
    public function clearCache()
    {
        // Reload Container
        $fs = new Filesystem();
        $fs->remove($this->container->getParameter('kernel.cache_dir'));

        // Redirect
        header('Content-Type: application/json');

        // Exit
        exit(json_encode(['status' => 'successful']));
    }
}
