![page-login](https://user-images.githubusercontent.com/8649070/42580602-9e3bd2b0-8533-11e8-9a37-4ebb02765559.jpg)

![page-admin](https://user-images.githubusercontent.com/8649070/42580601-9e100496-8533-11e8-93bf-9d74e721ccd5.png)

pdAdmin 
=========
Symfony Powerful Dashboard & Admin. Developed with **Symfony 4 Flex** framework.

No changes were made to the symfony structure, the current directory structure is used. A custom namespace for Admin has been created. This field is used for all administrator operations. 

The interface is designed to be responsive using Twitter Bootstrap. The least possible dependency was tried to be used. 

Installation
--------------------
1. Download pdAdmin
    ```
    composer create-project rmznpydn/pd-admin pdadmin 
    ```
2. Create and configure the `.env` file. Details are available in `.env.dist` file.

3. Create database schemas
    ```
    bin/console doctrine:schema:create --force
    ```
4. Run built-in web server
     ```
     bin/console server:start
     ```

Documentation
--------------------

* [User Management](#user-management)
* [Multilingual System](#multilingual-system)
* [Delegation](#delegation)
* [System Settings](#system-settings)
* [Mail Manager](#mail-manager)
* [Create New Widget](#create-new-widget)
* [Create New Menu](#create-new-menu)

### User Management
There is [pd-user](https://github.com/rmznpydn/pd-user) for user management. All settings are in __config/packages/pd_user.yaml__ file.

* __Create User:__
    ```
    bin/console user:create
    ```
* __Change User Password:__
    ```
    bin/console user:changepassword
    ```
* __Change User Roles:__
    ```
    bin/console user:role
    ```

### Multilingual System
User logon for multi language is used. Each user can choose his / her own language.
When you log in, you are automatically redirected.

New languages can be added from the kernel settings. You need to translate manually for the new language.

### Delegation
[SensioFrameworkExtraBundle](https://symfony.com/doc/master/bundles/SensioFrameworkExtraBundle/annotations/security.html) is used with Symfony security component. There are three default user roles.

* ROLE_USER
* ROLE_ADMIN
* ROLE_SUPER_ADMIN

ROLE_SUPER_ADMIN has full authority. ROLE_ADMIN and ROLE_USER authorities can be restricted and panel access can be turned off in the __security.yaml__ file.

### System Settings
System settings are stored in the database. All settings can be used as parameters after container assembly. Since all settings are compiled with the container
it does not create any additional load on the system. Settings can be configured using Symfony Forms and added to the Settings menu from the outside via the "Menu Event" system.
Clear the cache after changes to system settings, otherwise the new settings will not be enabled.

For general settings, you can add it to __src/Admin/Forms/System/GeneralForm__

__Add New Menu to Settings__:
```php    
<?php
//src/Admin/Menu/SettingsMenu.php

namespace App\Admin\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

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
            ->setRoles(['ADMIN_SETTINGS_EMAIL']);
            
        return $menu;
    }
}    
```

### Mail Manager
Mail Manager is made as Swiftmailer plugin. With Swiftmailer, the log of all mail is stored. 
In addition, it is a template manager. You can create custom templates (Email Template) for your posts and provide a compilation that includes submissions. 
The Mail Template is multi-language supported. You can create templates for different languages. 
Package installation __packages/pd_mailer.yaml__ located in the file. 
For further information please contact [pd-mailer](https://github.com/rmznpydn/pd-mailer)

Send Email:
```php 
// Create Message
$message = (new PdSwiftMessage())
    ->setTemplateId('tester_template') // Unique id for the Mail Template
    ->setFrom('example@example.com', 'pdAdmin')
    ->setTo('client@example.com')
    ->setSubject('pdAdmin Test Mail')
    ->setBody(serialize([
        'name' => 'pdAdmin',
        'age' => '25',
        'company' => 'WriteLN'
    ]), 'text/html'); // Twig variables for Mail Template

// Send Message
$this->get('mailer')->send($message);
```

### Create New Widget
Widget system was created with Symfony "EventDispatcher Component". 
It has an adjustable structure for each user and it can be specially designed with "Twig Template" engine. 
For more information visit [pd-widget](https://github.com/rmznpydn/pd-widget)

Create New Admin Widget:
```php
<?php
//src/Admin/Widgets/AccountWidget.php

namespace App\Admin\Widgets;

use Pd\WidgetBundle\Builder\Item;
use Pd\WidgetBundle\Event\WidgetEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class AccountWidget
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Build Widgets.
     *
     * @param WidgetEvent $event
     */
    public function builder(WidgetEvent $event)
    {
        // Get Widget Container
        $widgets = $event->getWidgetContainer();

        // Add Widgets
        $widgets
            ->addWidget((new Item('user_statistics', 3600))
                ->setGroup('admin') // Widget Adds to "Admin" Group
                ->setName('widget_user_statistics.name')
                ->setDescription('widget_user_statistics.description')
                ->setTemplate('@Admin/Widget/userStatistics.html.twig')
                ->setRole(['ADMIN_WIDGET_USERSTATISTICS'])
                ->setConfigProcess(function (Request $request) {
                    /**
                     * Controller for Widget Settings
                     * The return value is stored in the user specific database
                     */
                    if ($type = $request->get('type')) {
                        switch ($type) {
                            case '1week':
                                return ['type' => '1week'];
                            case '1month':
                                return ['type' => '1month'];
                            case '3month':
                                return ['type' => '3month'];
                        }
                    }

                    return false;
                })
                ->setData(function ($config) {
                    /**
                     * The return value can be used in the twig template.
                     * The function will not execute unless you call it in the template.
                     * You can use the database operations here.
                     */
                    // Set Default Config
                    if (!isset($config['type'])) {
                        $config['type'] = '1week';
                    }

                    // Create Statistics Data
                    if ($config['type'] === '1month') {
                        $data = ['chartDay' => '7'];
                        // Create Data
                    } else if ($config['type'] === '1month') {
                        $data = ['chartDay' => '30'];
                    } else {
                        $data = ['chartDay' => '90'];
                    }

                    return $data;
                })
            );
    }
}
```

### Create New Menu
The menu system was created with Symfony "EventDispatcher Component". 
For each menu created, Event is generated by default, can be turned off by menu configuration. 
For more information visit the [pd-menu](https://github.com/rmznpydn/pd-menu)

Example:
```php
<?php
// src/Admin/Menu/MainNav.php

namespace App\Admin\Menu;

use Pd\MenuBundle\Builder\ItemInterface;
use Pd\MenuBundle\Builder\Menu;

class MainNav extends Menu
{
    public function createMenu(array $options = []): ItemInterface
    {
        // Create ROOT Menu
        $menu = $this->createRoot('main_menu', true); // Event enabled

        // Create Dashboard
        $menu->addChild('nav_dashboard', 1)
            ->setLabel('nav_dashboard')
            ->setRoute('admin_dashboard')
            ->setRoles(['ADMIN_DASHBOARD'])
            ->setExtra('label_icon', 'dashboard');

        /*
         * Create Account Section
         */
        $menu
            ->addChild('nav_account', 10)
            ->setLabel('nav_account')
            ->setRoute('admin_account_list')
            ->setRoles(['ADMIN_ACCOUNT_LIST'])
            ->setExtra('label_icon', 'people')
            // Account List
            ->addChild('nav_account', 10)
            ->setLabel('nav_account')
            ->setRoute('admin_account_list')
            ->setRoles(['ADMIN_ACCOUNT_LIST'])
            // Group List
            ->addChildParent('nav_group', 20)
            ->setLabel('nav_group')
            ->setRoute('admin_account_group_list')
            ->setRoles(['ADMIN_GROUP_LIST']);

        return $menu;
    }
}
```
