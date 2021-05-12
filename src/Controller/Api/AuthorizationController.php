<?php

namespace App\Controller\Api;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Pd\ApiBundle\Controller\AbstractApiController;
use Symfony\Component\Routing\Annotation\Route;

class AuthorizationController extends AbstractApiController
{
    #[Route('/auth/login', name: 'api.login', methods: ['POST'])]
    public function attemptLogin(JWTTokenManagerInterface $tokenManager): array
    {
        return [
            'token' => $tokenManager->create($this->getUser()),
            'data' => $this->getUser(),
        ];
    }
}
