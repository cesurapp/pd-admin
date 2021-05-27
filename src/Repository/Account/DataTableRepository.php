<?php

namespace App\Repository\Account;

use App\Entity\Account\DataTable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method DataTable|null find($id, $lockMode = null, $lockVersion = null)
 * @method DataTable|null findOneBy(array $criteria, array $orderBy = null)
 * @method DataTable[]    findAll()
 * @method DataTable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DataTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DataTable::class);
    }

    /**
     * Create Table Data User
     */
    public function createOrUpdate(UserInterface $user, Request $request): DataTable
    {
        $table = $this->findOneBy([
                'owner' => $user->getId(),
                'name' => $request->get('table')
            ]) ?? new DataTable();

        $data = $request->getContent() ? json_decode($request->getContent(), true) : null;

        // Set Data
        $table
            ->setName($request->get('table'))
            ->setOwner($user)
            ->setHidden($request->get('hidden', $data['hidden'] ?? []))
            ->setOrders($request->get('orders', $data['orders'] ?? []));

        // Save
        $this->_em->persist($table);
        $this->_em->flush();

        return $table;
    }
}
