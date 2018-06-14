<?php

namespace App\Admin\Entity\Account;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Pd\UserBundle\Model\Group as BaseGroup;

/**
 * @ORM\Table(name="user_group")
 * @ORM\Entity(repositoryClass="App\Admin\Repository\Account\GroupRepository")
 * @UniqueEntity(fields="name", message="group_already_taken")
 */
class Group extends BaseGroup
{
}
