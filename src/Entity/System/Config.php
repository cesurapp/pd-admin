<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Entity\System;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Config Parameters Entity.
 *
 * @ORM\Table(name="app_config")
 * @ORM\Entity(repositoryClass="App\Repository\System\ConfigRepository")
 * @ORM\Cache(usage="NONSTRICT_READ_WRITE")
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Config
{
    public const TYPES = ['boolean', 'string', 'number', 'json', 'array'];

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=190, unique=true)
     * @Assert\Length(max=190, min=1)
     */
    private string $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private ?string $value;

    /**
     * @ORM\Column(type="string", length=15)
     * @Assert\Choice(choices=Config::TYPES)
     */
    private string $type;

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function getConvertedValue()
    {
        if (!$this->value || !$this->type) {
            return null;
        }

        switch ($this->type) {
            case 'boolean': return (bool)$this->value;
            case 'number': return (int)$this->value;
            case 'string': return (string)$this->value;
            case 'array': return unserialize($this->value);
            case 'json': return json_decode($this->value, true);
        }

        return null;
    }

    public function setValue($value): self
    {
        if (is_array($value)) {
            $value = serialize($value);
        }

        $this->value = $value;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}
