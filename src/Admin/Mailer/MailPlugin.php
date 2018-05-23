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

namespace App\Admin\Mailer;

use App\Admin\Entity\System\MailLog;
use App\Admin\Entity\System\MailTemplate;
use Doctrine\ORM\EntityManagerInterface;
use Swift_Events_TransportExceptionEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Swiftmailer Plugin.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class MailPlugin implements \Swift_Events_SendListener, \Swift_Events_TransportExceptionListener
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @var string
     */
    private $rawBody;

    /**
     * @var \Swift_Mime_SimpleMessage
     */
    private $msg;

    /**
     * @param EntityManagerInterface $entityManager
     * @param ContainerInterface     $container
     */
    public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container)
    {
        $this->em = $entityManager;
        $this->container = $container;
    }

    /**
     * Invoked immediately before the Message is sent.
     *
     * @param \Swift_Events_SendEvent $evt
     *
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Syntax
     */
    public function beforeSendPerformed(\Swift_Events_SendEvent $evt)
    {
        if (\Swift_Events_SendEvent::RESULT_PENDING === $evt->getResult()) {
            // Set Variables
            $msg = $evt->getMessage();
            $contentId = null !== ($fb = $evt->getMessage()->getHeaders()->get('Content-Description')) ? $fb->getFieldBody() : null;
            $this->rawBody = $evt->getMessage()->getBody();

            // Using Template
            if (null !== $contentId && !empty($contentId) && ($data = @unserialize($this->rawBody))) {
                // Render
                $this->renderTemplate($contentId, $msg, $data);
            }

            // Set From Name-Email
            if (count($evt->getMessage()->getFrom()) < 1) {
                $evt->getMessage()->setFrom(
                    $this->container->getParameter('mail_sender_address'),
                    $this->container->getParameter('mail_sender_name')
                );
            }
        }
    }

    /**
     * Invoked immediately after the Message is sent.
     *
     * @param \Swift_Events_SendEvent $evt
     */
    public function sendPerformed(\Swift_Events_SendEvent $evt)
    {
        // Mail Spooled Directory not Send
        if (\Swift_Events_SendEvent::RESULT_SPOOLED === $evt->getResult()) {
            $this->msg = $evt->getMessage();
            $this->createMailLog($evt->getMessage(), \Swift_Events_SendEvent::RESULT_SPOOLED);
        }

        // Mail Send Success
        if (\Swift_Events_SendEvent::RESULT_SUCCESS === $evt->getResult()) {
            $this->createMailLog($evt->getMessage(), \Swift_Events_SendEvent::RESULT_SUCCESS, true);
        }
    }

    /**
     * Invoked as a TransportException is thrown in the Transport system.
     *
     * @param Swift_Events_TransportExceptionEvent $evt
     */
    public function exceptionThrown(Swift_Events_TransportExceptionEvent $evt)
    {
        // Stop This
        $evt->cancelBubble();

        // Update Mail Exception
        $mailLog = $this->em->getRepository(MailLog::class)->findOneBy(['mId' => $this->msg->getId()]);
        if (null !== $mailLog) {
            $mailLog->setStatus(\Swift_Events_SendEvent::RESULT_FAILED);
            $mailLog->addException($evt->getException()->getMessage().PHP_EOL);
            $this->em->persist($mailLog);
            $this->em->flush();
        }
    }

    /**
     * Render Mail Template.
     *
     * @param null                      $contentId
     * @param \Swift_Mime_SimpleMessage $msg
     * @param array                     $bodyData
     *
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Syntax
     */
    private function renderTemplate($contentId, \Swift_Mime_SimpleMessage &$msg, array $bodyData)
    {
        // Find Template
        $template = $this->em->getRepository(MailTemplate::class)
            ->findTemplate($contentId, 1, [$this->container->get('request_stack')->getCurrentRequest()->getLocale()]);
        $template = is_array($template) ? (count($template) ? $template[0] : null) : $template;

        if (null !== $template) {
            // Render Body Template
            $temp = $template->getTemplate();
            if (!empty($temp)) {
                $twig = $this->container->get('twig')->createTemplate($temp);
                $msg->setBody($twig->render($bodyData), 'text/html');
            }

            // Set Subject
            $subject = $template->getSubject();
            if (!empty($subject)) {
                $msg->setSubject($subject);
            }

            // Set From Email-Name
            $fromName = $template->getFromName();
            $fromEmail = $template->getFromEmail();
            if (!empty($fromName) && !empty($fromEmail)) {
                $msg->setFrom($fromEmail, $fromName);
            } else {
                $msg->setFrom(
                    $this->container->getParameter('mail_sender_address'),
                    $this->container->getParameter('mail_sender_name')
                );
            }
        } else {
            if (count($bodyData)) {
                $content = '';
                foreach ($bodyData as $key => $value) {
                    if (is_object($value) && !method_exists($value, '__toString')) {
                        continue;
                    }

                    $content .= $key.': {{ '.$key.' }}'.PHP_EOL;
                }

                $twig = $this->container->get('twig')->createTemplate($content);
                $msg->setBody($twig->render($bodyData));
            }
        }
    }

    /**
     * Create New Mail Log || Queue.
     *
     * @param \Swift_Mime_SimpleMessage $msg
     * @param $result
     * @param bool $update
     *
     * @return bool
     */
    private function createMailLog(\Swift_Mime_SimpleMessage $msg, $result, $update = false)
    {
        // Check Message
        if (null === $msg->getId() || empty($msg->getId())) {
            return false;
        }

        // Create or Select Mail
        $mailLog = $this->em->getRepository(MailLog::class)->findOneBy(['mId' => $msg->getId()]);
        if (null === $mailLog) {
            $mailLog = new MailLog();
        }

        // Create Queue
        if (!$update) {
            $mailLog->setMId($msg->getId());
            $mailLog->setMFrom($msg->getFrom());
            $mailLog->setMTo($msg->getTo());
            $mailLog->setSubject($msg->getSubject());
            $mailLog->setBody($this->rawBody);
            $mailLog->setContentType($msg->getContentType());
            $mailLog->setDate($msg->getDate());
            $mailLog->setHeader($msg->getHeaders()->toString());
            $mailLog->setReplyTo($msg->getReplyTo());
            $mailLog->setStatus($result);
            $mailLog->setContentId(($fb = $msg->getHeaders()->get('Content-Description')) ? $fb->getFieldBody() : null);
            $mailLog->setLanguage($this->container->get('request_stack')->getCurrentRequest()->getLocale());
        } else {
            $mailLog->setDate($msg->getDate());
            $mailLog->setStatus($result);
        }

        // Save || Update
        $this->em->persist($mailLog);
        $this->em->flush();

        return true;
    }
}
