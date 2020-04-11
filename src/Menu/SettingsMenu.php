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
 * Settings Menus.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class SettingsMenu extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Item
        $menu = $this->createRoot('settings_menu')->setChildAttr([
            'class' => 'nav nav-pills',
            'data-parent' => 'admin_settings_general',
        ]);

        // Create Menu Items
        $menu->addChild('nav_config_general')
            ->setLabel('nav_config_general')
            ->setRoute('admin_settings_general')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ROLE_SETTINGS_GENERAL'])
            // Contact
            ->addChildParent('nav_config_contact')
            ->setLabel('nav_config_contact')
            ->setRoute('admin_settings_contact')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ROLE_SETTINGS_CONTACT'])
            // Account
            ->addChildParent('nav_config_user')
            ->setLabel('nav_config_user')
            ->setRoute('admin_settings_user')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ROLE_SETTINGS_USER'])
            // Media
            ->addChildParent('nav_config_media')
            ->setLabel('nav_config_media')
            ->setRoute('admin_settings_media')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ROLE_SETTINGS_MEDIA']);

        return $menu;
    }
}
