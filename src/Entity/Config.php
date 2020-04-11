<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Config Parameters Entity.
 *
 * @ORM\Table(name="app_config")
 * @ORM\Entity(repositoryClass="App\Repository\ConfigRepository")
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Config
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=190, unique=true)
     */
    private $name;

    /**
     * @var array
     *
     * @ORM\Column(type="simple_array", nullable=true)
     */
    private $value = [];

    /**
     * Get id.
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get name.
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get value.
     */
    public function getValue(): ?array
    {
        return $this->value;
    }

    /**
     * Set value.
     *
     * @param string|array $value
     *
     * @return $this
     */
    public function setValue($value): self
    {
        $this->value = !\is_array($value) ? [$value] : $value;

        return $this;
    }
}
