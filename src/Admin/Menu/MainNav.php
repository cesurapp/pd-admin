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

namespace App\Admin\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

class MainNav extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create ROOT Menu
        $menu = $this->createRoot('main_menu', true);

        // Create Dashboard
        $menu->addChild('nav_dashboard', 1)
            ->setLabel('nav_dashboard')
            ->setRoute('admin_dashboard')
            ->setRoles(['ADMIN_DASHBOARD'])
            ->setExtra('label_icon', 'dashboard');

        /*
         * Create Account Section
         */
        $menu
            ->addChild('nav_account', 20)
            ->setLabel('nav_account')
            ->setRoute('admin_account_list')
            ->setRoles(['ADMIN_ACCOUNT_LIST'])
            ->setExtra('label_icon', 'people')
            // Account List
            ->addChild('nav_account', 10)
            ->setLabel('nav_account')
            ->setRoute('admin_account_list')
            ->setRoles(['ADMIN_ACCOUNT_LIST'])
            // Group List
            ->addChildParent('nav_group', 20)
            ->setLabel('nav_group')
            ->setRoute('admin_account_group_list')
            ->setRoles(['ADMIN_GROUP_LIST']);

        /*
         * Create Settings Section
         */
        $menu
            ->addChild('nav_config', 50)
            ->setLabel('nav_config')
            ->setRoute('admin_settings_general')
            ->setExtra('label_icon', 'settings')
            ->setRoles(['ADMIN_SETTINGS'])
            // System Settings Divider
            ->addChild('nav_system_header', 1)
            ->setLabel('nav_system_header')
            ->setListAttr(['class' => 'header'])
            ->setLabelAttr(['class' => 'title'])
            ->setRoles(['ADMIN_SETTINGS_GENERAL'])
            // Admin Settings
            ->addChildParent('nav_system', 10)
            ->setLabel('nav_system')
            ->setRoute('admin_settings_general')
            ->setRoles(['ADMIN_SETTINGS_GENERAL'])
            // Tools Divider
            ->addChildParent('nav_tools_header', 20)
            ->setLabel('nav_tools_header')
            ->setListAttr(['class' => 'header'])
            ->setLabelAttr(['class' => 'title'])
            ->setRoles(['ADMIN_SETTINGS_GENERAL']);

        return $menu;
    }
}
