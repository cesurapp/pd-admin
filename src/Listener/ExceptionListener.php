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

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\RouterInterface;

/**
 * Exception Listener.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class ExceptionListener
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * ExceptionListener constructor.
     *
     * @param RouterInterface $router
     */
    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
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
                $event->setResponse(new RedirectResponse($this->router->generate('admin_not_found')));
                break;
        }
    }
}
