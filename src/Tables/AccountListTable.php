<?php

namespace App\Tables;

use App\DataTable\AbstractDataTable;
use App\DataTable\DataTableFilters;
use Doctrine\ORM\QueryBuilder;

class AccountListTable extends AbstractDataTable
{
    protected function initColumns(): array
    {
        return [
            'id' => [
                'field' => 'id',
                'field_sort' => 'u.id',
                'label' => 'ID',
                'width' => '50px',
                'centered' => false,
                'visible' => true,
                'sortable' => true,
                //'class' => 'custom-class',
                //'template' => '<span class="badge bg-secondary">{{ data }}</span>',
                //'background' => '#333333',
                //'roles' => ['ROLE_ACCOUNT_LIST'],
                //'export_template' => '',
                'filters' => [
                    DataTableFilters::number('id', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.id = :uid')->setParameter('uid', $data['id']);
                    }, 'ID')
                ]
            ],
            'email' => [
                'field' => 'email',
                'field_sort' => 'u.email',
                'label' => 'E-posta',
                'sortable' => true,
                'filters' => [
                    DataTableFilters::email('email', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.email = :email')->setParameter('email', $data['email']);
                    }, 'E-posta adresi')
                ]
            ],
            'active' => [
                'field' => 'active',
                'field_sort' => 'u.active',
                'label' => 'Aktif',
                'sortable' => true,
                'template' => '<span class="badge bg-success" v-if="data.active">Evet</span>
                               <span class="badge bg-secondary" v-else>Hayır</span>',
                'export_template' => fn($data) => $data ? 'Evet' : 'Hayır',
                'filters' => [
                    DataTableFilters::switch('active', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.active = :active')->setParameter('active', (bool)json_decode(strtolower($data['active'])));
                    }, 'Aktif / İnaktif')
                ]
            ],
            'freeze' =>  [
                'field' => 'freeze',
                'field_sort' => 'u.freeze',
                'label' => 'Dondurulmuş',
                'sortable' => true,
                'template' => '<span class="badge bg-danger" v-if="data.freeze">Evet</span>
                               <span class="badge bg-secondary" v-else>Hayır</span>',
                'export_template' => fn($data) => $data ? 'Evet' : 'Hayır',
                'filters' => [
                    DataTableFilters::switch('freeze', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.freeze = :freeze')->setParameter('freeze', (bool)json_decode(strtolower($data['freeze'])));
                    }, 'Aktif / Dondurulmuş')
                ]
            ],
            'lastLogin' => [
                'field' => 'lastLogin',
                'field_sort' => 'u.lastLogin',
                'label' => 'Son Giriş',
                'sortable' => true,
                'template' => '<span>{{ dateRelative(data.lastLogin) }}</span>',
                'filters' => [
                    DataTableFilters::dateRange('lastLogin', static function (QueryBuilder $query, array $data) {
                        if (isset($data['lastLogin']['start'])) {
                            $query->andWhere('u.lastLogin >= :lastStart')->setParameter('lastStart', new \DateTime($data['lastLogin']['start']));
                        }
                        if (isset($data['lastLogin']['end'])) {
                            $query->andWhere('u.lastLogin < :lastEnd')->setParameter('lastEnd', new \DateTime($data['lastLogin']['end']));
                        }
                    })
                ]
            ],
            'createdAt' => [
                'field' => 'createdAt',
                'field_sort' => 'u.createdAt',
                'label' => 'Oluşturulma',
                'sortable' => true,
                'template' => '<span>{{ dateISOTime(data.createdAt) }}</span>',
                'export_template' => fn(\DateTimeInterface $date) => $date->format('d.m.Y H:i'),
                'filters' => [
                    DataTableFilters::dateRange('createdAt', static function (QueryBuilder $query, array $data) {
                        if (isset($data['createdAt']['start'])) {
                            $query->andWhere('u.createdAt >= :createdStart')->setParameter('createdStart', new \DateTime($data['createdAt']['start']));
                        }
                        if (isset($data['createdAt']['end'])) {
                            $query->andWhere('u.createdAt < :createdEnd')->setParameter('createdEnd', new \DateTime($data['createdAt']['end']));
                        }
                    })
                ]
            ],
            'firstName' => [
                'field' => 'firstName',
                'field_sort' => 'u.firstName',
                'label' => 'Ad',
                'sortable' => true,
                'filters' => [
                    DataTableFilters::text('firstName', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.firstName LIKE :firstName')->setParameter('firstName', "%{$data['firstName']}%");
                    }, 'İsim')
                ]
            ],
            'lastName' => [
                'field' => 'lastName',
                'field_sort' => 'u.lastName',
                'label' => 'Soyad',
                'sortable' => true,
                'filters' => [
                    DataTableFilters::text('lastName', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.lastName LIKE :lastName')->setParameter('lastName', "%{$data['lastName']}%");
                    }, 'Soyisim')
                ]
            ],
            'phone' => [
                'field' => 'phone',
                'field_sort' => 'u.phone',
                'label' => 'Telefon',
                'sortable' => true,
                'filters' => [
                    DataTableFilters::number('phone', static function (QueryBuilder $query, array $data) {
                        $query->andWhere('u.phone = :phone')->setParameter('phone', $data['phone']);
                    }, 'Telefon')
                ]
            ]
        ];
    }
}
