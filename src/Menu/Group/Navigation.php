<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu\Group;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * Groups Menus.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Navigation extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('groups_menu')->setChildAttr([
            'sidebar' => 'nav_group',
        ]);

        // Add Menu Items
        $menu
            ->addChild('nav_group_edit', 1)
            ->setLabel('nav_group_edit')
            ->setRoute('admin_group_edit', ['group' => $options['item'] ?? 0])
            ->setRoles(['ROLE_GROUP_EDIT'])

            ->addChildParent('nav_group_roles', 5)
            ->setLabel('nav_group_roles')
            ->setRoute('admin_group_roles', ['group' => $options['item'] ?? 0])
            ->setRoles(['ROLE_GROUP_ROLES']);

        return $menu;
    }
}
