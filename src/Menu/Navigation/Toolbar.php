<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Menu\Navigation;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;
use Symfony\Component\Intl\Languages;

/**
 * Toolbar Navigation.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class Toolbar extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create Menu Root
        $menu = $this->createRoot('action_menu');

        // Add Home Item
        /*$menu->addChild('nav_home', 1)
            ->setLabel('nav_home')
            ->setRoute('web_home')
            ->setLinkAttr(['data-tooltip' => '', 'title' => 'homepage'])
            ->setLabelAttr(['class' => 'hidden'])
            ->setExtra('label_icon', 'home')
            ->setExtra('label_translate', false);*/

        // Language Dropdown
        $this->addLanguage($menu, $options);

        // Profile Dropdown
        $this->addProfile($menu, $options);

        return $menu;
    }

    /**
     * Add Language Menu.
     *
     * @param ItemInterface $menu
     * @param array         $options
     */
    private function addLanguage(ItemInterface $menu, array $options = [])
    {
        $languageDropdown = $menu->addChild('nav_language', 10)
            ->setLabel('nav_language')
            ->setLink('#')
            ->setLabelAttr(['class' => 'hidden'])
            ->setLinkAttr(['class' => 'dropdown-toggle', 'data-toggle' => 'dropdown'])
            ->setChildAttr(['class' => 'dropdown-menu-right dropdown-menu'])
            ->setExtra('label_translate', false)
            ->setExtra('label_icon', 'flag');

        $activeLang = array_intersect_key(Languages::getNames(), array_flip($options['active_language']));
        foreach ($activeLang as $key => $label) {
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
     *
     * @param ItemInterface $menu
     * @param array         $options
     */
    private function addProfile(ItemInterface $menu, array $options = [])
    {
        // Root Item
        $menu->addChild('nav_profile', 100)
            ->setLabel('nav_profile')
            ->setLink('#')
            ->setLabelAttr(['class' => 'hidden'])
            ->setLinkAttr(['class' => 'dropdown-toggle', 'data-toggle' => 'dropdown'])
            ->setChildAttr(['class' => 'dropdown-menu-right dropdown-menu'])
            ->setExtra('label_translate', false)
            ->setExtra('label_icon', 'person')
            // Hello
            ->addChild('nav_profile_hello')
            ->setLabel(sprintf('%s %s', $options['user']->getProfile()->getFirstname(), $options['user']->getProfile()->getLastname()))
            ->setExtra('label_translate', false)
            ->setLabelAttr(['class' => 'disabled dropdown-header dropdown-item'])
            // Profile
            ->addChildParent('nav_profile_edit')
            ->setLabel('nav_profile_edit')
            ->setRoute('admin_account_edit', ['user' => $options['user']->getId()])
            ->setLinkAttr(['class' => 'dropdown-item'])
            ->setExtra('label_icon', 'person')
            ->setRoles(['ROLE_ACCOUNT_EDIT'])
            // Change Password
            ->addChildParent('nav_profile_password')
            ->setLabel('nav_profile_password')
            ->setRoute('admin_account_changepassword', ['user' => $options['user']->getId()])
            ->setLinkAttr(['class' => 'dropdown-item'])
            ->setExtra('label_icon', 'security')
            ->setRoles(['ROLE_ACCOUNT_CHANGEPASSWORD'])
            // Add Divider
            ->addChildParent('divider')
            ->setExtra('label_translate', false)
            ->setListAttr(['class' => 'dropdown-divider'])
            // Return Admin (Role Switch)
            ->addChildParent('nav_profile_return_admin')
            ->setLabel('nav_profile_return_admin')
            ->setRoute('admin_dashboard', ['_switch_user' => '_exit'])
            ->setLinkAttr(['class' => 'dropdown-item bg-warning'])
            ->setExtra('label_icon', 'supervisor_account')
            ->setRoles(['ROLE_PREVIOUS_ADMIN'])
            // Logout
            ->addChildParent('nav_profile_logout')
            ->setLabel('nav_profile_logout')
            ->setRoute('security_logout')
            ->setLinkAttr(['class' => 'dropdown-item'])
            ->setExtra('label_icon', 'power_settings_new');
    }
}
