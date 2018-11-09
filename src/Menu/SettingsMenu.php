<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 *
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 *
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * Settings Menus.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
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
            ->setRoles(['ADMIN_SETTINGS_GENERAL'])
            // Contact
            ->addChildParent('nav_config_contact')
            ->setLabel('nav_config_contact')
            ->setRoute('admin_settings_contact')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ADMIN_SETTINGS_CONTACT'])
            // Email
            ->addChildParent('nav_config_email')
            ->setLabel('nav_config_email')
            ->setRoute('admin_settings_email')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ADMIN_SETTINGS_EMAIL'])
            // Account
            ->addChildParent('nav_config_user')
            ->setLabel('nav_config_user')
            ->setRoute('admin_settings_user')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ADMIN_SETTINGS_USER'])
            // Media
            ->addChildParent('nav_config_media')
            ->setLabel('nav_config_media')
            ->setRoute('admin_settings_media')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ADMIN_SETTINGS_MEDIA'])
            // Core
            ->addChildParent('nav_config_core')
            ->setLabel('nav_config_core')
            ->setRoute('admin_settings_core')
            ->setLinkAttr(['class' => 'nav-item'])
            ->setRoles(['ADMIN_SETTINGS_CORE']);

        return $menu;
    }
}
