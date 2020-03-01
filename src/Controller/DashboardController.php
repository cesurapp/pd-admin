<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller;

use Pd\WidgetBundle\Widget\WidgetInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Admin Dashboard.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class DashboardController extends AbstractController
{
    /**
     * Dashboard Index.
     *
     * @Route(name="dashboard", path="/")
     * @IsGranted("ROLE_DASHBOARD_PANEL")
     */
    public function index(): Response
    {
        // Set Back URL
        $this->get('session')->set('backUrl', $this->get('router')->generate('admin_dashboard'));

        // Render Page
        return $this->render('Admin/dashboard.html.twig');
    }

    /**
     * Change Language for Session.
     *
     * @param string $lang
     *
     * @Route(name="language", path="/language/{lang}")
     */
    public function changeLanguage(Request $request, WidgetInterface $widget, $lang): RedirectResponse
    {
        // Set Language for Session
        $request->getSession()->set('_locale', $lang);

        // Flush Widget Cache
        $widget->clearWidgetCache();

        // Return Back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_dashboard')));
    }
}
