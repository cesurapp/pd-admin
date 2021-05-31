<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Entity\Account;

use App\Repository\Account\DataTableRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=DataTableRepository::class)
 * @ORM\Table(uniqueConstraints={
 *      @ORM\UniqueConstraint(name="name_owner_unique", columns={"name", "owner_id"})
 * })
 * @UniqueEntity(fields={"name", "owner_id"})
 */
class DataTable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups("default")
     */
    private ?array $hidden = [];

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups("default")
     */
    private ?array $orders = [];

    /**
     * @ORM\Column(type="string", length=25)
     * @Assert\Length(min="3", max="25")
     * @Groups("default")
     */
    private ?string $name = null;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private ?User $owner;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHidden(): ?array
    {
        return $this->hidden;
    }

    public function setHidden(?array $hidden): self
    {
        $this->hidden = $hidden;

        return $this;
    }

    public function getOrders(): ?array
    {
        return $this->orders;
    }

    public function setOrders(?array $orders): self
    {
        $this->orders = $orders;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?UserInterface $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
