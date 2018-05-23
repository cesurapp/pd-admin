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

namespace App\Web\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller managing the localization.
 *
 * routing : /language/lang
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class LocaleController extends Controller
{
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

        return $this->redirectToRoute('web_home');
    }
}
