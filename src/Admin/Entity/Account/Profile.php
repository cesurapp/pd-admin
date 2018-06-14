<?php

namespace App\Admin\Entity\Account;

use Doctrine\ORM\Mapping as ORM;
use Pd\UserBundle\Model\Profile as BaseProfile;

/**
 * User Profile Table.
 *
 * @ORM\Table(name="user_profile")
 * @ORM\Entity
 */
class Profile extends BaseProfile
{
}
