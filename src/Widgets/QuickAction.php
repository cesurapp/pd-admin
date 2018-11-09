<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 *
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 *
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Widgets;

use Doctrine\ORM\EntityManagerInterface;
use Pd\WidgetBundle\Builder\Item;
use Pd\WidgetBundle\Event\WidgetEvent;
use Symfony\Component\HttpFoundation\Request;

/**
 * Quick Action Widget.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class QuickAction
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Account Constructor.
     *
     * @param EntityManagerInterface $entityManager
     */
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

        // Action Button
        $items = [
            'action_account' => [
                'name' => 'nav_account',
                'description' => 'admin_account_desc',
                'route' => 'admin_account_list',
                'icons' => 'person',
                'linkClass' => 'btn btn-primary',
            ],
            'action_group' => [
                'name' => 'nav_group',
                'description' => 'accouunt_group_list_title',
                'route' => 'admin_account_group_list',
                'icons' => 'group',
                'linkClass' => 'btn btn-primary',
            ],
            'action_settings' => [
                'name' => 'settings_general',
                'description' => 'settings_general_desc',
                'route' => 'admin_settings_general',
                'icons' => 'settings',
                'linkClass' => 'btn btn-secondary',
            ],
            'mail_manager' => [
                'name' => 'nav_mail_manager',
                'description' => 'mail_manager_list_desc',
                'route' => 'admin_mail_list',
                'icons' => 'email',
                'linkClass' => 'btn btn-secondary',
            ],
            'mail_manager_logs' => [
                'name' => 'mail_manager_logger',
                'description' => 'mail_manager_logger_desc',
                'route' => 'admin_mail_logger',
                'icons' => 'send',
                'linkClass' => 'btn btn-secondary',
            ],
        ];

        // Add Widgets
        $widgets
            ->addWidget(
                (new Item('quick_action'))
                ->setGroup('admin')
                ->setName('widget_quick_action.name')
                ->setDescription('widget_quick_action.description')
                ->setTemplate('Admin/Widget/quickAction.html.twig')
                ->setRole(['ADMIN_WIDGET_QUICKACTION'])
                ->setConfigProcess(function (Request $request) use ($items) {
                    if ($id = $request->get('id')) {
                        if (isset($items[$id])) {
                            return [$id => $items[$id]];
                        }
                    }

                    return false;
                })
                ->setData(function ($config) use ($items) {
                    return ['items' => $items];
                })
                ->setOrder(0)
            );
    }
}
