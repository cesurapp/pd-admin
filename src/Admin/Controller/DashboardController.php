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
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Admin\Controller;

use App\Admin\Services\ReloadContainer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
     * Clear Symfony Cache.
     */
    public function clearCache()
    {
        // Reload Container
        $rc = new ReloadContainer($this->container);
        $rc->reloadContainer();

        // Redirect
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'successful',
        ]);

        exit();
    }
}
