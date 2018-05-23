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

class AccountMenu extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('account_menu')->setChildAttr(['class' => 'nav nav-pills']);

        // Add Menu Items
        $menu
            ->addChild('nav_account_edit', 1)
            ->setLabel('nav_account_edit')
            ->setRoute('admin_account_edit', ['user' => $options['user'] ?? 0])
            ->setRoles(['ADMIN_ACCOUNT_EDIT'])

            ->addChildParent('nav_account_change_password', 5)
            ->setLabel('nav_account_change_password')
            ->setRoute('admin_account_changepassword', ['user' => $options['user'] ?? 0])
            ->setRoles(['ADMIN_ACCOUNT_CHANGEPASSWORD'])

            ->addChildParent('nav_account_roles', 10)
            ->setLabel('nav_account_roles')
            ->setRoute('admin_account_roles', ['user' => $options['user'] ?? 0])
            ->setRoles(['ADMIN_ACCOUNT_EDITROLES'])

            ->addChildParent('nav_account_group', 15)
            ->setLabel('nav_account_group')
            ->setRoute('admin_account_addgroup', ['user' => $options['user'] ?? 0])
            ->setRoles(['ADMIN_ACCOUNT_ADDGROUP']);

        return $menu;
    }
}
