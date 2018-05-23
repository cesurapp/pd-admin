<?php

namespace App\Admin\Widgets;

use Pd\WidgetBundle\Builder\Item;
use Pd\WidgetBundle\Event\WidgetEvent;

class Dashboard
{
    public function builder(WidgetEvent $event)
    {
        $widgets = $event->getWidgetContainer();

        $widgets
            ->addWidget((new Item('user_info'))
                ->setGroup('admin')
                ->setName('widget_user_info.name')
                ->setDescription('widget_user_info.description')
                ->setTemplate('@Admin/Widget/userInfo.html.twig')
                ->setRole(['ADMIN_ACCOUNT_LIST'])
                ->setData(function () {
                    /*$userCount = $em->getRepository(User::class)
                        ->createQueryBuilder('u')
                        ->select('count(u.id)')
                        ->getQuery()
                        ->getSingleScalarResult();*/

                    return ['userCount' => 5];
                })
                ->setOrder(5)
            );
    }
}
