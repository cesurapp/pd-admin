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

namespace App\Admin\Controller\System;

use App\Admin\Entity\System\MailLog;
use App\Admin\Entity\System\MailTemplate;
use App\Admin\Form\System\MailTemplateForm;
use App\Admin\Services\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Mail Controller.
 *
 * routing : /admin/tools/mail/*
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class MailController extends Controller
{
    /**
     * List Mail Templates.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATELIST")
     */
    public function list(Request $request)
    {
        // Get Query
        $query = $this->getDoctrine()
            ->getRepository(MailTemplate::class)
            ->createQueryBuilder('m');

        // Get Result
        $pagination = $this->get('knp_paginator');
        $pagination = $pagination->paginate(
            $query,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        // Set Back URL
        $this->get('session')->set('backUrl', $request->getRequestUri());

        // Render
        return $this->render('@Admin/System/Mail/list.html.twig', [
            'templates' => $pagination,
        ]);
    }

    /**
     * Add Templates.
     *
     * @param Request $request
     * @param MailLog $mailLog
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATEADD")
     */
    public function addMailTemplate(Request $request, MailLog $mailLog)
    {
        // Create Mail Template
        $template = new MailTemplate();
        $template->setContentId($mailLog->getContentId());
        $template->setSubject($mailLog->getSubject());

        // Create Form
        $form = $this->createForm(MailTemplateForm::class, $template, ['contentId_disable' => true, 'container' => $this->container]);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Add object
            $template->setObject($mailLog->getBody());

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($template);
            $em->flush();

            // Message
            $this->addFlash('success', 'changes_saved');

            // Return Edit Page
            $this->redirectToRoute('admin_mail_template_edit', ['id' => $template->getId()]);
        }

        return $this->render('@Admin/System/Mail/template.html.twig', [
            'form' => $form->createView(),
            'objects' => @unserialize($mailLog->getBody()),
            'title' => 'mail_manager_template_add',
            'description' => 'mail_manager_template_add_desc',
            'defaultTemplate' => $this->get('router')->generate('admin_mail_default_template', ['templateId' => $form->get('contentId')->getData()]),
        ]);
    }

    /**
     * Edit Templates.
     *
     * @param Request      $request
     * @param MailTemplate $mailTemplate
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATEEDIT")
     */
    public function editMailTemplate(Request $request, MailTemplate $mailTemplate)
    {
        // Create Form
        $form = $this->createForm(MailTemplateForm::class, $mailTemplate, [
            'contentId_disable' => false,
            'container' => $this->container,
        ]);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($mailTemplate);
            $em->flush();

            // Message
            $this->addFlash('success', 'changes_saved');
        }

        return $this->render('@Admin/System/Mail/template.html.twig', [
            'form' => $form->createView(),
            'objects' => @unserialize($mailTemplate->getObject()),
            'title' => 'mail_manager_template_edit',
            'description' => 'mail_manager_template_edit_desc',
            'defaultTemplate' => $this->get('router')->generate('admin_mail_default_template', ['templateId' => $form->get('contentId')->getData()]),
        ]);
    }

    /**
     * Get Default Template.
     *
     * @param $templateId
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATEADD")
     */
    public function defaultTemplate($templateId)
    {
        // Load Email Template Resource
        $template = $this->getParameter('kernel.root_dir').'/Admin/Resources/emails/';

        if (file_exists($template."{$templateId}.html")) {
            $template = file_get_contents($template."{$templateId}.html");
        } else {
            $template = '';
        }

        return $this->json($template);
    }

    /**
     * Delete Templates.
     *
     * @param Request      $request
     * @param MailTemplate $mailTemplate
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATEDELETE")
     */
    public function deleteMailTemplate(Request $request, MailTemplate $mailTemplate)
    {
        // Not Found
        if (null === $mailTemplate) {
            $this->addFlash('error', 'sorry_not_existing');

            return $this->redirectToRoute('admin_mail_list');
        }

        // Remove Template
        $em = $this->getDoctrine()->getManager();
        $em->remove($mailTemplate);
        $em->flush();

        // Redirect Back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_mail_list'));
    }

    /**
     * Active/Deactive Templates.
     *
     * @param Request      $request
     * @param MailTemplate $mailTemplate
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_TEMPLATEACTIVE")
     */
    public function activateMailTemplate(Request $request, MailTemplate $mailTemplate)
    {
        // Set Status
        $mailTemplate->setStatus(!$mailTemplate->getStatus());

        // Save
        $em = $this->getDoctrine()->getManager();
        $em->persist($mailTemplate);
        $em->flush();

        // Message
        $this->addFlash('success', 'changes_saved');

        // Redirect Back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_mail_list'));
    }

    /**
     * View Mail Logs.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_LOGGER")
     */
    public function logger(Request $request)
    {
        // Get Logs
        $query = $this->getDoctrine()
            ->getRepository(MailLog::class)
            ->createQueryBuilder('m')
            ->orderBy('m.id', 'DESC')
            ->getQuery();

        // Get Result
        $pagination = $this->get('knp_paginator');
        $mailLog = $pagination->paginate(
            $query,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        return $this->render('@Admin/System/Mail/logger.html.twig', [
            'maillogs' => $mailLog,
        ]);
    }

    /**
     * View Log.
     *
     * @param MailLog $mailLog
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_VIEWLOG")
     */
    public function viewLog(MailLog $mailLog)
    {
        $tool = new Utils();
        $trans = $this->get('translator');
        $jsonData = [];

        // Create Log Data
        if (null !== $mailLog) {
            $jsonData = [
                $trans->trans('mail_contentid') => $mailLog->getContentId(),
                $trans->trans('mail_mid') => $mailLog->getMId(),
                $trans->trans('mail_to') => implode(PHP_EOL, $tool->implodeKeyValue($mailLog->getMTo(), ' -> ')),
                $trans->trans('mail_from') => implode(PHP_EOL, $tool->implodeKeyValue($mailLog->getMFrom(), ' -> ')),
                $trans->trans('mail_subject') => $mailLog->getSubject(),
                $trans->trans('mail_language') => $mailLog->getLanguage(),
                $trans->trans('mail_content_type') => $mailLog->getContentType(),
                $trans->trans('date') => date('Y-m-d H:i:s', $mailLog->getDate()->getTimestamp()),
                $trans->trans('mail_reply_to') => $mailLog->getReplyTo(),
                $trans->trans('mail_header') => str_replace(PHP_EOL, '<br/>', htmlspecialchars($mailLog->getHeader())),
                $trans->trans('mail_status') => $mailLog->getStatus(),
                $trans->trans('mail_exception') => str_replace(PHP_EOL, '<br/>', htmlspecialchars($mailLog->getException())),
            ];
        }

        // JSON Response
        return $this->json($jsonData);
    }

    /**
     * Delete Logs.
     *
     * @param Request $request
     * @param $mailLog
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_MAIL_LOGDELETE")
     */
    public function deleteLog(Request $request, $mailLog)
    {
        // Not Found
        if (null === $mailLog && !$request->request->has('id')) {
            $this->addFlash('error', 'sorry_not_existing');

            return $this->redirectToRoute('admin_mail_logger');
        }

        // Entity Manager
        $em = $this->getDoctrine()->getManager();

        // Convert Array
        $mailLog = $request->request->has('id') ? $request->request->get('id') : [$mailLog];

        // Remove Mail Log
        foreach ($mailLog as $log) {
            $findLog = $em->getRepository(MailLog::class)->find($log);
            if (null !== $findLog) {
                $em->remove($findLog);
            }
        }
        $em->flush();

        // Redirect Back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_mail_logger'));
    }
}
