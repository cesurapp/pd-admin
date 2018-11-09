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

namespace App\Listener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Exception Listener.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class ExceptionListener
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * Kernel Environment.
     *
     * @var string
     */
    private $environment;

    /**
     * ExceptionListener constructor.
     *
     * @param ContainerInterface $container
     * @param TranslatorInterface $translator
     * @param string $environment
     */
    public function __construct(ContainerInterface $container, TranslatorInterface $translator, string $environment)
    {
        $this->container = $container;
        $this->translator = $translator;
        $this->environment = $environment;
    }

    /**
     * Exception Handler.
     *
     * @param GetResponseForExceptionEvent $event
     */
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        // Get Exception
        $exception = $event->getException();

        switch (get_class($exception)) {
            case NotFoundHttpException::class:
                $event->setResponse(new RedirectResponse(
                    $this->container->get('router')->getGenerator()->generate('admin_not_found')
                ));
                break;
            case AccessDeniedHttpException::class:
                $event->setResponse(
                    $this->setAccessDeniedMessage($event, $exception->getMessage())
                );
                break;
        }
    }

    /**
     * Set Access Denied Message for Flashes
     *
     * @param GetResponseForExceptionEvent $event
     * @param string $message
     *
     * @return Response
     */
    private function setAccessDeniedMessage(GetResponseForExceptionEvent $event, string $message): Response
    {
        // Set Flash Message
        $event
            ->getRequest()
            ->getSession()
            ->getBag('flashes')
            ->add('error', $this->translator->trans($message));

        // Return Response
        return new RedirectResponse(
            $event->getRequest()->headers->get('referer') ?? $this->container->get('router')->getGenerator()->generate('admin_dashboard')
        );
    }
}
