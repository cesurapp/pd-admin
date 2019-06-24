<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Entity\Account;

use Doctrine\ORM\Mapping as ORM;
use Pd\UserBundle\Model\User as BaseUser;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * User Accounts.
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields="email", message="email_already_taken")
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class User extends BaseUser
{
}
