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

namespace App\Admin\Security;

use App\Admin\Entity\Account\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AdminVoter extends Voter
{
    protected function supports($attribute, $subject): bool
    {
        $excluded = [
            'IS_AUTHENTICATED_ANONYMOUSLY',
            'IS_AUTHENTICATED_FULLY',
            'IS_AUTHENTICATED_REMEMBERED',
            'ISGRANTED_VOTER',
            'ROLE_PREVIOUS_ADMIN',
        ];

        if (\in_array($attribute, $excluded, true)) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        // Get User
        $user = $token->getUser();

        // Check Login
        if (!$user instanceof User) {
            return false;
        }

        // Check All Access
        if (\in_array($attribute, $user->getRoles(), true)) {
            return true;
        }

        return false;
    }
}
