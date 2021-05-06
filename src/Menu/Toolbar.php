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
use Symfony\Component\Intl\Languages;

/**
 * Toolbar Navigation.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Toolbar extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Menu Root
        $menu = $this->createRoot('action_menu');
        $menu->setChildAttr(['class' => 'ms-auto']);

        $this->addLanguage($menu, $options);
        $this->addProfile($menu, $options);

        return $menu;
    }

    /**
     * Add Language Menu.
     */
    private function addLanguage(ItemInterface $menu, array $options = []): void
    {
        $languageDropdown = $menu->addChild('nav_language', 10)
            ->setLabel('nav_language')
            ->setLink('#')
            ->setLabelAttr(['class' => 'd-none'])
            ->setLinkAttr(['class' => 'dropdown-toggle', 'data-bs-toggle' => 'dropdown'])
            ->setChildAttr(['class' => 'dropdown-menu-end dropdown-menu'])
            ->setExtra('label_translate', false)
            ->setExtra('label_icon', 's fa-globe');

        foreach (array_intersect_key(Languages::getNames(), array_flip($options['active_language'])) as $key => $label) {
            $languageDropdown
                ->addChild($label)
                ->setLabel($label)
                ->setRoute('admin_language', ['lang' => $key])
                ->setExtra('label_translate', false)
                ->setLinkAttr(['class' => ($options['locale'] === $key) ? 'dropdown-item active' : 'dropdown-item']);
        }
    }

    /**
     * Add Profile Menu.
     */
    private function addProfile(ItemInterface $menu, array $options = []): void
    {
        // Root Item
        $menu->addChild('nav_profile', 100)
            ->setLabel('nav_profile')
            ->setLink('#')
            ->setLabelAttr(['class' => 'd-none'])
            ->setLinkAttr(['class' => 'dropdown-toggle', 'data-bs-toggle' => 'dropdown'])
            ->setChildAttr(['class' => 'dropdown-menu-end dropdown-menu'])
            ->setExtra('label_translate', false)
            ->setExtra('label_icon', 's fa-user-circle')
                // Hello
                ->addChild('nav_profile_hello')
                ->setLabel($options['user']->getFullName())
                ->setExtra('label_translate', false)
                ->setLabelAttr(['class' => 'disabled dropdown-header dropdown-item'])
                // Profile
                ->addChildParent('nav_profile_edit')
                ->setLabel('nav_profile_edit')
                ->setRoute('admin_account_edit', ['user' => $options['user']->getId()])
                ->setLinkAttr(['class' => 'dropdown-item'])
                ->setExtra('label_icon', 's fa-user-circle')
                ->setRoles(['ROLE_ACCOUNT_EDIT'])
                // Change Password
                ->addChildParent('nav_profile_password')
                ->setLabel('nav_profile_password')
                ->setRoute('admin_account_password', ['user' => $options['user']->getId()])
                ->setLinkAttr(['class' => 'dropdown-item'])
                ->setExtra('label_icon', 's fa-key')
                ->setRoles(['ROLE_ACCOUNT_PASSWORD'])
                // Add Divider
                ->addChildParent('divider')
                ->setExtra('label_translate', false)
                ->setListAttr(['class' => 'dropdown-divider'])
                // Return Admin (Role Switch)
                ->addChildParent('nav_profile_return_admin')
                ->setLabel('nav_profile_return_admin')
                ->setRoute('admin_dashboard', ['_switch_user' => '_exit'])
                ->setLinkAttr(['class' => 'dropdown-item bg-warning'])
                ->setExtra('label_icon', 's fa-arrow-circle-left')
                ->setRoles(['IS_IMPERSONATOR'])
                // Logout
                ->addChildParent('nav_profile_logout')
                ->setLabel('nav_profile_logout')
                ->setRoute('security_logout')
                ->setLinkAttr(['class' => 'dropdown-item'])
                ->setExtra('label_icon', 's fa-sign-out-alt');
    }
}
