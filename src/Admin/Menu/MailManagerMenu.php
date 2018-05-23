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

namespace App\Admin\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

class MailManagerMenu extends Menu
{
    /**
     * Mail Manager Custom Menus.
     *
     * @param array $options
     *
     * @return ItemInterface
     */
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root
        $menu = $this->createRoot('mail_manager')->setChildAttr(['class' => 'nav nav-pills']);

        // Create Menu Items
        $menu
            ->addChild('nav_mail_template')
            ->setLabel('nav_mail_template')
            ->setRoute('admin_mail_list')
            ->setRoles(['ADMIN_MAIL_LIST'])
            // Logger
            ->addChildParent('nav_mail_logger')
            ->setLabel('nav_mail_logger')
            ->setRoute('admin_mail_logger')
            ->setRoles(['ADMIN_MAIL_LIST']);

        return $menu;
    }
}
