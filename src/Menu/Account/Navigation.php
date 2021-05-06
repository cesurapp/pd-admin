<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu\Account;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * Account Menu.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Navigation extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('account_menu')->setChildAttr([
            'sidebar' => 'nav_account',
        ]);

        // Add Menu Items
        $menu
            ->addChild('nav_account_edit', 1)
            ->setLabel('nav_account_edit')
            ->setRoute('admin_account_edit', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_EDIT'])

            ->addChildParent('nav_account_change_password', 5)
            ->setLabel('nav_account_change_password')
            ->setRoute('admin_account_password', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_PASSWORD'])

            ->addChildParent('nav_account_roles', 10)
            ->setLabel('nav_account_roles')
            ->setRoute('admin_account_roles', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_EDITROLES'])

            ->addChildParent('nav_account_group', 15)
            ->setLabel('nav_account_group')
            ->setRoute('admin_account_group', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_GROUP']);

        return $menu;
    }
}
