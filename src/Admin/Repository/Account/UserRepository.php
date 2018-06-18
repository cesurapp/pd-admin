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

namespace App\Admin\Repository\Account;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function filterUser($filter = '')
    {
        // Create Query
        $query = $this->createQueryBuilder('u')
            ->leftJoin('u.profile', 'p')
            ->addSelect('p');

        // Add Filter Query
        if (is_array($filter)) {
            if (null !== $filter['filter']) {
                $query = $query
                    ->where('(u.email LIKE :filter) or (p.firstname LIKE :filter) or (p.lastname LIKE :filter) or (p.phone LIKE :filter) or (p.company LIKE :filter)')
                    ->setParameter('filter', "%{$filter['filter']}%");
            }
            if (null !== $filter['status']) {
                $query = $query->andWhere('u.isActive = :status')->setParameter('status', $filter['status']);
            }
        }

        return $query->getQuery();
    }
}
