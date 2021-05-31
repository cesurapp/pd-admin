<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Repository\Account;

use App\Entity\Account\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Filter User.
     */
    public function filter(Request $request): QueryBuilder
    {
        $query = $this->createQueryBuilder('u');

        // Add Filter
        if ($request->get('status')) {
            $query->andWhere('u.isActive = :status')->setParameter('status', $request->get('filter'));
        }
        if ($request->get('filter')) {
            $query
                ->where('(u.email LIKE :filter) or (u.firstName LIKE :filter) or (u.lastName LIKE :filter) or (u.phone LIKE :filter)')
                ->setParameter('filter', "%{$request->get('filter')}%");
        }

        return $query;
    }
}
