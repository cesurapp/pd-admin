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

namespace App\Admin\Widgets;

use App\Admin\Entity\Account\User;
use Doctrine\ORM\EntityManagerInterface;
use Pd\WidgetBundle\Builder\Item;
use Pd\WidgetBundle\Event\WidgetEvent;
use Symfony\Component\HttpFoundation\Request;

class Account
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Account Constructor
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Build Widgets
     *
     * @param WidgetEvent $event
     */
    public function builder(WidgetEvent $event)
    {
        // Get Widget Container
        $widgets = $event->getWidgetContainer();

        // Add Widgets
        $widgets
            ->addWidget((new Item('user_info'))
                ->setGroup('admin')
                ->setName('widget_user_info.name')
                ->setDescription('widget_user_info.description')
                ->setTemplate('@Admin/Widget/userInfo.html.twig')
                ->setRole(['ADMIN_ACCOUNT_LIST'])
                ->setConfigProcess(function (Request $request) {
                    if ($type = $request->get('type')) {
                        switch ($type) {
                            case "1week":
                                return ['type2' => '1week'];
                            case "1month":
                                return ['type2' => '1month'];
                            case "3month":
                                return ['type2' => '3month'];
                        }
                    }
                    return false;
                })
                ->setData(function ($config) {
                    $userCount = $this->entityManager->getRepository(User::class)
                        ->createQueryBuilder('u')
                        ->select('count(u.id)')
                        ->getQuery()
                        ->getSingleScalarResult();

                    return ['result' => $userCount];
                })
                ->setOrder(5)
            )
            ->addWidget((new Item('user_statistics'))
                ->setGroup('admin')
                ->setName('widget_user_statistics.name')
                ->setDescription('widget_user_statistics.description')
                ->setTemplate('@Admin/Widget/userStatistics.html.twig')
                ->setRole(['ADMIN_ACCOUNT_LIST'])
                ->setConfigProcess(function (Request $request) {
                    if ($type = $request->get('type')) {
                        switch ($type) {
                            case "1week":
                                return ['type' => '1week'];
                            case "1month":
                                return ['type' => '1month'];
                            case "3month":
                                return ['type' => '3month'];
                        }
                    }
                    return false;
                })
                ->setData(function ($config) {
                    $data = $this->entityManager->getRepository(User::class)
                        ->createQueryBuilder('u')
                        ->select('count(u.id) as count, DAY(u.createdAt) as day, DAY(u.createdAt) as HIDDEN createdAt')
                        ->groupBy('createdAt')
                        ->getQuery()
                        ->getResult();

                    return ['result' => $data, 'config' => $config];
                })
            );
    }
}
