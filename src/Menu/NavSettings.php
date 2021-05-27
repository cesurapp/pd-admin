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
class NavSettings extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Item
        $menu = $this->createRoot('config_toolbar')->setChildAttr([
            'sidebar' => 'config.system',
        ]);

        // Create Menu Items
        $menu->addChild('general')
            ->setLabel('config.general.title')
            ->setRoute('admin.config_general')
            ->setRoles(['ROLE_CONFIG_GENERAL'])
            // Account
            ->addChildParent('user')
            ->setLabel('config.user.title')
            ->setRoute('admin.config_user')
            ->setRoles(['ROLE_CONFIG_USER'])
            // Media
            ->addChildParent('media')
            ->setLabel('config.media.title')
            ->setRoute('admin.config_media')
            ->setRoles(['ROLE_CONFIG_MEDIA']);

        return $menu;
    }
}
