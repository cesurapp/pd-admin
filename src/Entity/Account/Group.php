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

use Doctrine\ORM\Mapping as ORM;
use Pd\UserBundle\Model\Group as BaseGroup;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * User Groups.
 *
 * @ORM\Table(name="user_group")
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 * @UniqueEntity(fields="name", message="group_already_taken")
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Group extends BaseGroup
{
}
