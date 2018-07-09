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

class GroupsMenu extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('groups_menu')->setChildAttr([
            'class' => 'nav nav-pills',
            'data-parent' => 'admin_account_group_list',
        ]);

        // Add Menu Items
        $menu
            ->addChild('nav_group_edit', 1)
            ->setLabel('nav_group_edit')
            ->setRoute('admin_account_group_edit', ['group' => $options['group'] ?? 0])
            ->setRoles(['ADMIN_GROUP_EDIT'])

            ->addChildParent('nav_group_roles', 5)
            ->setLabel('nav_group_roles')
            ->setRoute('admin_account_group_roles', ['group' => $options['group'] ?? 0])
            ->setRoles(['ADMIN_GROUP_ROLES']);

        return $menu;
    }
}
