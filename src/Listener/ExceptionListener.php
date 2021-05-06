<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
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
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class ExceptionListener implements EventSubscriberInterface
{
    private Environment $engine;

    public function __construct(Environment $engine)
    {
        $this->engine = $engine;
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        // Get Exception
        $exception = $event->getThrowable();

        if ($exception instanceof NotFoundHttpException) {
            $event->setResponse(new Response($this->engine->render('admin/layout/404.html.twig'), 404));
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::EXCEPTION => [['onKernelException']]];
    }
}
