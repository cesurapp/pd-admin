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
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Auth\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * User Profile Table.
 *
 * @ORM\Table(name="user_profile")
 * @ORM\Entity
 */
class Profile
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
     * @ORM\Column(name="firstname", type="string", length=50)
     * @Assert\NotBlank()
     * @Assert\Length(min="3", max="50")
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=50)
     * @Assert\NotBlank()
     * @Assert\Length(min="3", max="50")
     */
    private $lastname;

    /**
     * @var int
     *
     * @ORM\Column(name="phone", type="integer", length=13, nullable=true)
     * @Assert\Length(min="8", max="13")
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="website", type="string", length=100, nullable=true)
     * @Assert\Url()
     */
    private $website;

    /**
     * @var string
     *
     * @ORM\Column(name="company", type="string", length=100, nullable=true)
     * @Assert\Length(min="2", max="100")
     */
    private $company;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=3, nullable=true)
     * @Assert\Language()
     */
    private $language;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstname.
     *
     * @param string $firstname
     *
     * @return Profile
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname.
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname.
     *
     * @param string $lastname
     *
     * @return Profile
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname.
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Get Fullname.
     *
     * @return string
     */
    public function getFullName()
    {
        return $this->firstname.' '.$this->lastname;
    }

    /**
     * Set phone.
     *
     * @param int $phone
     *
     * @return Profile
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return int
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set website.
     *
     * @param string $website
     *
     * @return Profile
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get website.
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set company.
     *
     * @param string $company
     *
     * @return Profile
     */
    public function setCompany($company)
    {
        $this->company = $company;

        return $this;
    }

    /**
     * Get company.
     *
     * @return string
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set language.
     *
     * @param string $language
     *
     * @return Profile
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * Get language.
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getFullName();
    }
}
