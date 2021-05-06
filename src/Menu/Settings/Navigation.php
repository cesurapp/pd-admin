<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu\Settings;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * Settings Menus.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Navigation extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Item
        $menu = $this->createRoot('nav_settings')->setChildAttr([
            'sidebar' => 'nav_system',
        ]);

        // Create Menu Items
        $menu->addChild('nav_config_general')
            ->setLabel('nav_config_general')
            ->setRoute('admin_config_general')
            ->setRoles(['ROLE_CONFIG_GENERAL'])
            // Account
            ->addChildParent('nav_config_user')
            ->setLabel('nav_config_user')
            ->setRoute('admin_config_user')
            ->setRoles(['ROLE_CONFIG_USER'])
            // Media
            ->addChildParent('nav_config_media')
            ->setLabel('nav_config_media')
            ->setRoute('admin_config_media')
            ->setRoles(['ROLE_CONFIG_MEDIA']);

        return $menu;
    }
}
