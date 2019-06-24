<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu\Action;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

/**
 * User Actions.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class Account extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Root Menu
        $menu = $this->createRoot('account_action_menu');

        // Add Menu Items
        $menu
            ->addChild('admin_account_delete', 1)
            ->setLabel('delete')
            ->setRoute('admin_account_delete', ['user' => $options['user']->getId()])
            ->setRoles(['ROLE_ACCOUNT_DELETE'])
            ->setExtra('label_icon', 'delete')
            ->setLinkAttr([
                'class' => 'text-danger',
                'data-tooltip' => '',
                'title' => 'delete',
                'data-modal' => 'confirm',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_activate', 1)
            ->setLabel('activate_deactivate')
            ->setRoute('admin_account_activate', ['user' => $options['user']->getId(), 'status' => $options['user']->isEnabled() ? 0 : 1])
            ->setRoles(['ROLE_ACCOUNT_ACTIVATE'])
            ->setExtra('label_icon', 'check_circle')
            ->setLinkAttr([
                'class' => $options['user']->isEnabled() ? 'text-success' : '',
                'data-tooltip' => '',
                'title' => 'activate_deactivate',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_freeze', 1)
            ->setLabel('freeze_unfreeze')
            ->setRoute('admin_account_freeze', ['user' => $options['user']->getId(), 'status' => $options['user']->isFreeze() ? 0 : 1])
            ->setRoles(['ROLE_ACCOUNT_FREEZE'])
            ->setExtra('label_icon', 'check_circle')
            ->setLinkAttr([
                'class' => $options['user']->isFreeze() ? 'text-danger' : '',
                'data-tooltip' => '',
                'title' => 'freeze_unfreeze',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('switch_user', 1)
            ->setLabel('switch_user')
            ->setRoute('admin_dashboard', ['_switch_user' => $options['user']->getEmail()])
            ->setRoles(['ROLE_ALLOWED_TO_SWITCH'])
            ->setExtra('label_icon', 'account_circle')
            ->setLinkAttr([
                'data-tooltip' => '',
                'title' => 'switch_user',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_addgroup', 1)
            ->setLabel('edit_group')
            ->setRoute('admin_account_addgroup', ['user' => $options['user']->getId()])
            ->setRoles(['ROLE_ACCOUNT_ADDGROUP'])
            ->setExtra('label_icon', 'group')
            ->setLinkAttr([
                'data-tooltip' => '',
                'title' => 'edit_group',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_roles', 1)
            ->setLabel('edit_roles')
            ->setRoute('admin_account_roles', ['user' => $options['user']->getId()])
            ->setRoles(['ROLE_ACCOUNT_ROLES'])
            ->setExtra('label_icon', 'lock')
            ->setLinkAttr([
                'data-tooltip' => '',
                'title' => 'edit_roles',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_changepassword', 1)
            ->setLabel('change_password')
            ->setRoute('admin_account_changepassword', ['user' => $options['user']->getId()])
            ->setRoles(['ROLE_ACCOUNT_CHANGEPASSWORD'])
            ->setExtra('label_icon', 'security')
            ->setLinkAttr([
                'data-tooltip' => '',
                'title' => 'change_password',
            ])
            ->setLabelAttr(['class' => 'hidden'])

            ->addChildParent('admin_account_edit', 1)
            ->setLabel('edit')
            ->setRoute('admin_account_edit', ['user' => $options['user']->getId()])
            ->setRoles(['ROLE_ACCOUNT_EDIT'])
            ->setExtra('label_icon', 'mode_edit')
            ->setLinkAttr([
                'data-tooltip' => '',
                'title' => 'edit',
            ])
            ->setLabelAttr(['class' => 'hidden']);

        return $menu;
    }
}
