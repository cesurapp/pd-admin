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
use Pd\UserBundle\Model\Profile as BaseProfile;

/**
 * User Profile Table.
 *
 * @ORM\Table(name="user_profile")
 * @ORM\Entity
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class Profile extends BaseProfile
{
}
