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
        return $this->render('@Admin/Home/dashboard.html.twig');
    }

    /**
     * Change Language for Session.
     *
     * @param string  $lang
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function changeLanguage($lang, Request $request)
    {
        // Set Language for Session
        $request->getSession()->set('_locale', $lang);

        // Return Back
        if (isset($_SERVER['HTTP_REFERER'])) {
            return $this->redirect($_SERVER['HTTP_REFERER']);
        }

        return $this->redirectToRoute('admin_dashboard');
    }
}
