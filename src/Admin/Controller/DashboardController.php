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

namespace App\Admin\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Admin Dashboard.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class DashboardController extends Controller
{
    /**
     * Dashboard.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_DASHBOARD_PANEL")
     */
    public function index()
    {
        // Set Back URL
        $this->get('session')->set('backUrl', $this->get('router')->generate('admin_dashboard'));

        return $this->render('@Admin/Home/dashboard.html.twig');
    }

    /**
     * Change Language for Session.
     *
     * @param string $lang
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function changeLanguage($lang, Request $request)
    {
        // Set Language for Session
        $request->getSession()->set('_locale', $lang);

        // Flush Widget Cache
        $widgetCore = $this->get('pd_widget.core')->getWidgets();
        $cacheApp = $this->get('cache.app');
        foreach ($widgetCore as $widget) {
            $cacheApp->deleteItem($widget->getId() . $this->getUser()->getId());
        }

        // Return Back
        return isset($_SERVER['HTTP_REFERER']) ? $this->redirect($_SERVER['HTTP_REFERER']) : $this->redirectToRoute('admin_dashboard');
    }
}
