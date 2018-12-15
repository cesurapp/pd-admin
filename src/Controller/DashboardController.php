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

use Pd\WidgetBundle\Widget\WidgetInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Admin Dashboard.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class DashboardController extends AbstractController
{
    /**
     * Dashboard Index.
     *
     * @Route(name="dashboard", path="/")
     * @IsGranted("ROLE_DASHBOARD_PANEL")
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
     * Change Language for Session.
     *
     * @param Request         $request
     * @param WidgetInterface $widget
     * @param string          $lang
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @Route(name="language", path="/language/{lang}")
     */
    public function changeLanguage(Request $request, WidgetInterface $widget, $lang)
    {
        // Set Language for Session
        $request->getSession()->set('_locale', $lang);

        // Flush Widget Cache
        $widget->clearWidgetCache();

        // Return Back
        return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('admin_dashboard'));
    }
}
