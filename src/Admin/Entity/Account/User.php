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

namespace App\Admin\Entity\Account;

use Doctrine\ORM\Mapping as ORM;
use Pd\UserBundle\Model\User as BaseUser;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Admin\Repository\Account\UserRepository")
 * @UniqueEntity(fields="email", message="email_already_taken")
 */
class User extends BaseUser
{
    public function __construct()
    {
        parent::__construct();
    }
}
