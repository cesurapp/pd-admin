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

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Exception Listener.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class ExceptionListener
{
    /**
     * @var \Twig_Environment
     */
    private $engine;

    /**
     * ExceptionListener constructor.
     *
     * @param \Twig_Environment $engine
     */
    public function __construct(\Twig_Environment $engine)
    {
        $this->engine = $engine;
    }

    /**
     * Exception Handler.
     *
     * @param GetResponseForExceptionEvent $event
     *
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        // Get Exception
        $exception = $event->getException();

        if ($exception instanceof NotFoundHttpException) {
            $event->setResponse(new Response(
                $this->engine->render('Admin/_other/notFound.html.twig', []),
                404
            ));
        }
    }
}
