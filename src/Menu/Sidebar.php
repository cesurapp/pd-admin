<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * Main Navigation.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Sidebar extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create ROOT Menu
        $menu = $this->createRoot('main_menu', true);
        $menu->addChild('nav_dashboard', 1)
            ->setLabel('nav_dashboard')
            ->setRoute('admin.dashboard')
            ->setRoles(['ROLE_DASHBOARD'])
            ->setExtra('label_icon', 's fa-chart-pie');

        /**
         * Account Menus
         */
        $menu
            ->addChild('nav_accounts', 20)
            ->setLabel('nav_account')
            ->setRoute('admin.account_list')
            ->setRoles(['ROLE_ACCOUNT_LIST'])
            ->setExtra('label_icon', 's fa-user-shield')
                // Account List
                ->addChild('nav_account', 10)
                ->setLabel('nav_account')
                ->setRoute('admin.account_list')
                ->setRoles(['ROLE_ACCOUNT_LIST'])
                // Group List
                ->addChildParent('nav_group', 20)
                ->setLabel('nav_group')
                ->setRoute('admin_group_list')
                ->setRoles(['ROLE_GROUP_LIST']);

        /**
         * Settings Menus
         */
        $menu
            ->addChild('config', 50)
            ->setLabel('config.title')
            ->setRoute('admin.config_general')
            ->setExtra('label_icon', 's fa-cogs')
            ->setRoles(['ROLE_CONFIG_GENERAL'])
                // Admin Settings
                ->addChild('config.system', 10)
                ->setLabel('config.system')
                ->setRoute('admin.config_general')
                ->setRoles(['ROLE_CONFIG_GENERAL']);

        return $menu;
    }
}
