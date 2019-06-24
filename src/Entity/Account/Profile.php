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
use Pd\UserBundle\Model\Profile as BaseProfile;

/**
 * User Profile Table.
 *
 * @ORM\Table(name="user_profile")
 * @ORM\Entity
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class Profile extends BaseProfile
{
}
