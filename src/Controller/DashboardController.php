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

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Admin Dashboard.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class DashboardController extends Controller
{
    /**
     * Dashboard Index.
     *
     * @Route(name="dashboard", path="/")
     * @IsGranted("ADMIN_DASHBOARD_PANEL")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {
        // Set Back URL
        $this->get('session')->set('backUrl', $this->get('router')->generate('admin_dashboard'));

        // Render Page
        return $this->render('Admin/dashboard.html.twig');
    }

    /**
     * 404 Not Found Pages
     *
     * @Route(name="not_found", path="/404")
     *
     * @return Response
     */
    public function notFound()
    {
        // Render Page
        return $this->render('Admin/_other/notFound.twig', [], new Response('', 404));
    }

    /**
     * Change Language for Session.
     *
     * @param string  $lang
     * @param Request $request
     * @Route(name="language", path="/language/{lang}")
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function changeLanguage($lang, Request $request)
    {
        // Set Language for Session
        $request->getSession()->set('_locale', $lang);

        // Flush Widget Cache
        $widgetCore = $this->get('pd_widget.core')->getWidgets();
        $cacheApp = $this->get('cache.app');
        foreach ($widgetCore as $widget) {
            $cacheApp->deleteItem($widget->getId().$this->getUser()->getId());
        }

        // Return Back
        return isset($_SERVER['HTTP_REFERER']) ? $this->redirect($_SERVER['HTTP_REFERER']) : $this->redirectToRoute('admin_dashboard');
    }
}
