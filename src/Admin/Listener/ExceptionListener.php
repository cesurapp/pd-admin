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

namespace App\Admin\Listener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Exception Listener.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
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
     * @param ContainerInterface  $container
     * @param TranslatorInterface $translator
     * @param string              $environment
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
        if (!in_array($this->environment, ['dev', 'test'], true)) {
            // You get the exception object from the received event
            $exception = $event->getException();
            $flashes = $event->getRequest()->getSession()->getBag('flashes');

            $path = pathinfo($event->getRequest()->getRequestUri(), PATHINFO_EXTENSION);

            if (basename($exception->getFile()) !== 'RouterListener.php' &&
                !in_array($path, ['js', 'css', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'png', 'ico', 'xml'])) {
                $flashes->add('error', $this->translator->trans($exception->getMessage()));

                // Redirect
                $redirectUrl = ($r = $event->getRequest()->headers->get('referer')) ? $r : $this->container->get('router')->getGenerator()->generate('web_home');
                $event->setResponse(new RedirectResponse($redirectUrl));
            }
        }
    }
}
