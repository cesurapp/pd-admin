<?php

namespace App\Tables;

use App\DataTable\AbstractDataTable;
use App\DataTable\DataTableFilters;
use Doctrine\ORM\QueryBuilder;

class ActivityLogMailTable extends AbstractDataTable
{
    protected function initColumns(): array
    {
        return [
            [
                'field' => 'id',
                'field_sort' => 'q.id',
                'label' => 'ID',
                'width' => '50px',
                'centered' => false,
                'visible' => true,
                'sortable' => true,
                'filters' => [
                    DataTableFilters::number('id', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.id = :uid')->setParameter('uid', $data['id']);
                    }, 'ID')
                ]
            ],
            [
                'field' => 'mailSubject',
                'field_sort' => 'q.mailSubject',
                'label' => 'Konu',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailSubject', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailSubject LIKE :mailSubject')->setParameter('mailSubject', "%{$data['mailSubject']}%");
                    }, 'Konu')
                ]
            ],
            [
                'field' => 'mailBody',
                'field_sort' => 'q.mailBody',
                'label' => 'İçerik',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailBody', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailBody LIKE :mailBody')->setParameter('mailBody', "%{$data['mailBody']}%");
                    }, 'Posta İçeriği')
                ]
            ],
            [
                'field' => 'mailTo',
                'field_sort' => 'q.mailTo',
                'label' => 'TO',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailTo', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailTo LIKE :mailTo')->setParameter('mailTo', "%{$data['mailTo']}%");
                    }, 'TO')
                ]
            ],
            [
                'field' => 'mailFrom',
                'field_sort' => 'q.mailFrom',
                'label' => 'From',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailFrom', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailFrom LIKE :mailFrom')->setParameter('mailFrom', "%{$data['mailFrom']}%");
                    }, 'From')
                ]
            ],
            [
                'field' => 'mailCC',
                'field_sort' => 'q.mailCC',
                'label' => 'CC',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailCC', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailCC LIKE :mailCC')->setParameter('mailCC', "%{$data['mailCC']}%");
                    }, 'CC')
                ]
            ],
            [
                'field' => 'mailBcc',
                'field_sort' => 'q.mailBcc',
                'label' => 'BCC',
                'sortable' => false,
                'filters' => [
                    DataTableFilters::email('mailBcc', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.mailBcc LIKE :mailBcc')->setParameter('mailBcc', "%{$data['mailBcc']}%");
                    }, 'BCC')
                ]
            ],
            [
                'field' => 'createdAt',
                'field_sort' => 'q.createdAt',
                'label' => 'Oluşturulma',
                'sortable' => true,
                'template' => '<span>{{ dateISOTime(data.createdAt) }}</span>',
                'filters' => [
                    DataTableFilters::dateRange('createdAt', static function (QueryBuilder $query, array $data) {
                        if (isset($data['createdAt']['start'])) {
                            $query->andWhere('q.createdAt >= :createdStart')->setParameter('createdStart', new \DateTime($data['createdAt']['start']));
                        }
                        if (isset($data['createdAt']['end'])) {
                            $query->andWhere('q.createdAt < :createdEnd')->setParameter('createdEnd', new \DateTime($data['createdAt']['end']));
                        }
                    })
                ]
            ]
        ];
    }
}
