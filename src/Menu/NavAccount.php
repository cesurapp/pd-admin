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
 * Account Menu.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class NavAccount extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('account_menu')->setChildAttr([
            'sidebar' => 'accounts',
        ]);

        // Add Menu Items
        $menu
            ->addChild('account_edit', 1)
            ->setLabel('account.edit.title')
            ->setRoute('admin.account_edit', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_EDIT'])

            ->addChildParent('nav_account_change_password', 5)
            ->setLabel('account.password.title')
            ->setRoute('admin.account_password', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_PASSWORD'])

            ->addChildParent('nav_account_roles', 10)
            ->setLabel('account.roles.title')
            ->setRoute('admin.account_roles', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_EDITROLES'])

            ->addChildParent('nav_account_group', 15)
            ->setLabel('account.groups.title')
            ->setRoute('admin.account_group', ['user' => $options['item'] ?? 0])
            ->setRoles(['ROLE_ACCOUNT_GROUP']);

        return $menu;
    }
}
