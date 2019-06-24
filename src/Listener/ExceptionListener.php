<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Listener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Twig\Environment;

/**
 * Exception Listener.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class ExceptionListener implements EventSubscriberInterface
{
    /**
     * @var Environment
     */
    private $engine;

    /**
     * ExceptionListener constructor.
     *
     * @param Environment $engine
     */
    public function __construct(Environment $engine)
    {
        $this->engine = $engine;
    }

    /**
     * Exception Handler.
     *
     * @param ExceptionEvent $event
     */
    public function onKernelException(ExceptionEvent $event)
    {
        // Get Exception
        $exception = $event->getException();

        if ($exception instanceof NotFoundHttpException) {
            $event->setResponse(new Response(
                $this->engine->render('Admin/_other/notFound.html.twig'), 404
            ));
        }
    }

    public static function getSubscribedEvents()
    {
        return [
           KernelEvents::EXCEPTION => [['onKernelException']],
       ];
    }
}
