<?php

namespace App\Tables;

use App\DataTable\AbstractDataTable;
use App\DataTable\DataTableFilters;
use Doctrine\ORM\QueryBuilder;

class GroupListTable extends AbstractDataTable
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
                'field' => 'name',
                'field_sort' => 'q.name',
                'label' => 'Grup Adı',
                'sortable' => true,
                'filters' => [
                    DataTableFilters::email('name', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('q.name LIKE :name')->setParameter('name', "%{$data['name']}%");
                    }, 'Grup Adı')
                ]
            ]
        ];
    }
}
