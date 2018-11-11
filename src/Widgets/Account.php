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

use App\Entity\Account\User;
use Doctrine\ORM\EntityManagerInterface;
use Pd\WidgetBundle\Builder\Item;
use Pd\WidgetBundle\Event\WidgetEvent;
use Symfony\Component\HttpFoundation\Request;

/**
 * Account Widget.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class Account
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

        // Add Widgets
        $widgets
            ->addWidget(
                (new Item('user_info'))
                    ->setGroup('admin')
                    ->setName('widget_user_info.name')
                    ->setDescription('widget_user_info.description')
                    ->setTemplate('Admin/Widget/userInfo.html.twig')
                    ->setRole(['ROLE_WIDGET_USERINFO'])
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
            ->addWidget(
                (new Item('user_statistics'))
                    ->setGroup('admin')
                    ->setName('widget_user_statistics.name')
                    ->setDescription('widget_user_statistics.description')
                    ->setTemplate('Admin/Widget/userStatistics.html.twig')
                    ->setRole(['ROLE_WIDGET_USERSTATISTICS'])
                    ->setConfigProcess(function (Request $request) {
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
                        // Create Chart Data
                        $chart = [
                            'column' => [],
                            'created' => [],
                            'logged' => [],
                        ];

                        // Set Default
                        if (!isset($config['type'])) {
                            $config['type'] = '1week';
                        }

                        // Create Statistics Data
                        if ('3month' === $config['type']) {
                            // Load Records
                            $createdData = $this->entityManager->getRepository(User::class)
                                ->createQueryBuilder('u')
                                ->select('count(u.id) as count, MONTH(u.createdAt) as month')
                                ->groupBy('month')
                                ->where('u.createdAt >= :date')
                                ->setParameter('date', new \DateTime('-3 Month'))
                                ->getQuery()->getArrayResult();
                            $loggedData = $this->entityManager->getRepository(User::class)
                                ->createQueryBuilder('u')
                                ->select('count(u.id) as count, MONTH(u.lastLogin) as month')
                                ->groupBy('month')
                                ->where('u.lastLogin >= :date')
                                ->setParameter('date', new \DateTime('-3 Month'))
                                ->getQuery()->getArrayResult();
                            $createdData = array_column($createdData, 'count', 'month');
                            $loggedData = array_column($loggedData, 'count', 'month');

                            // Optimize Data
                            for ($i = 0; $i < 3; ++$i) {
                                $month = explode('/', date('n/Y', strtotime("-{$i} month")));
                                $chart['column'][] = $month[0].'/'.$month[1];
                                $chart['created'][] = $createdData[$month[0]] ?? 0;
                                $chart['logged'][] = $loggedData[$month[0]] ?? 0;
                            }
                        } elseif (\in_array($config['type'], ['1month', '1week'], true) || !$config['type']) {
                            $time = '1month' === $config['type'] ? new \DateTime('-1 Month') : new \DateTime('-6 Day');
                            $column = '1month' === $config['type'] ? 30 : 7;

                            // Load Records
                            $createdData = $this->entityManager->getRepository(User::class)
                                ->createQueryBuilder('u')
                                ->select('count(u.id) as count, DAY(u.createdAt) as day')
                                ->groupBy('day')
                                ->where('u.createdAt >= :date')
                                ->setParameter('date', $time)
                                ->getQuery()->getArrayResult();
                            $loggedData = $this->entityManager->getRepository(User::class)
                                ->createQueryBuilder('u')
                                ->select('count(u.id) as count, DAY(u.lastLogin) as day')
                                ->groupBy('day')
                                ->where('u.lastLogin >= :date')
                                ->setParameter('date', $time)
                                ->getQuery()->getArrayResult();
                            $createdData = array_column($createdData, 'count', 'day');
                            $loggedData = array_column($loggedData, 'count', 'day');

                            // Optimize Data
                            for ($i = 0; $i < $column; ++$i) {
                                $day = explode('/', date('j/m', strtotime("-{$i} day")));
                                $chart['column'][] = $day[0].'/'.$day[1];
                                $chart['created'][] = $createdData[$day[0]] ?? 0;
                                $chart['logged'][] = $loggedData[$day[0]] ?? 0;
                            }
                        }

                        // JSON & Reverse Data
                        $chart['column'] = json_encode(array_reverse($chart['column']));
                        $chart['created'] = json_encode(array_reverse($chart['created']));
                        $chart['logged'] = json_encode(array_reverse($chart['logged']));

                        return $chart;
                    })
            );
    }
}
