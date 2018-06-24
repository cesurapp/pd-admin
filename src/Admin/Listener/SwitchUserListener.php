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

namespace App\Admin\Listener;

use App\Admin\Entity\Account\User;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Role\SwitchUserRole;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Event\SwitchUserEvent;
use Symfony\Component\Security\Http\Firewall\ListenerInterface;
use Symfony\Component\Security\Http\SecurityEvents;

/**
 * SwitchUserListener allows a user to impersonate another one temporarily
 * (like the Unix su command).
 *
 * @author Fabien Potencier <fabien@symfony.com>
 * @author Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 */
class SwitchUserListener implements ListenerInterface
{
    private $tokenStorage;
    private $provider;
    private $userChecker;
    private $providerKey;
    private $accessDecisionManager;
    private $usernameParameter;
    private $role;
    private $logger;
    private $dispatcher;

    public function __construct(TokenStorageInterface $tokenStorage, UserProviderInterface $provider, UserCheckerInterface $userChecker, $providerKey,
                                AccessDecisionManagerInterface $accessDecisionManager, LoggerInterface $logger = null, $usernameParameter = '_switch_user',
                                $role = 'ROLE_ALLOWED_TO_SWITCH', EventDispatcherInterface $dispatcher = null)
    {
        if (empty($providerKey)) {
            throw new \InvalidArgumentException('$providerKey must not be empty.');
        }

        $this->tokenStorage = $tokenStorage;
        $this->provider = $provider;
        $this->userChecker = $userChecker;
        $this->providerKey = $providerKey;
        $this->accessDecisionManager = $accessDecisionManager;
        $this->usernameParameter = $usernameParameter;
        $this->role = $role;
        $this->logger = $logger;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Handles the switch to another user.
     *
     * @param GetResponseEvent $event A GetResponseEvent instance
     *
     * @throws \LogicException if switching to a user failed
     */
    public function handle(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        if (!$request->get($this->usernameParameter)) {
            return;
        }

        if ('_exit' === $request->get($this->usernameParameter)) {
            $this->tokenStorage->setToken($this->attemptExitUser($request));
        } else {
            try {
                $this->tokenStorage->setToken($this->attemptSwitchUser($request));
            } catch (AuthenticationException $e) {
                throw new \LogicException(sprintf('Switch User failed: "%s"', $e->getMessage()));
            }
        }

        $request->query->remove($this->usernameParameter);
        $request->server->set('QUERY_STRING', http_build_query($request->query->all()));

        $response = new RedirectResponse($request->getUri(), 302);

        $event->setResponse($response);
    }

    /**
     * Attempts to switch to another user.
     *
     * @param Request $request A Request instance
     *
     * @throws \LogicException
     * @throws AccessDeniedException
     *
     * @return TokenInterface|null The new TokenInterface if successfully switched, null otherwise
     */
    private function attemptSwitchUser(Request $request)
    {
        $token = $this->tokenStorage->getToken();
        $originalToken = $this->getOriginalToken($token);

        if (false !== $originalToken) {
            if ($token->getUsername() === $request->get($this->usernameParameter)) {
                return $token;
            }

            throw new \LogicException('not_login_already_switched');
        }

        if (false === $this->accessDecisionManager->decide($token, [$this->role])) {
            $exception = new AccessDeniedException('not_login_switch_authorized');
            $exception->setAttributes($this->role);

            throw $exception;
        }

        $username = $request->get($this->usernameParameter);

        if (null !== $this->logger) {
            $this->logger->info('Attempting to switch to user.', ['username' => $username]);
        }

        $user = $this->provider->loadUserByUsername($username);
        $this->userChecker->checkPostAuth($user);

        /*
         * Block Own Account
         */
        if ($token->getUsername() === $user->getUsername()) {
            throw new AccessDeniedException('not_login_own_account');
        }

        /*
         * User To Super_Admin Block Access
         */
        if (!$token->getUser()->hasRole(User::ROLE_ALL_ACCESS)) {
            if ($user->hasRole(User::ROLE_ALL_ACCESS)) {
                throw new AccessDeniedException('not_login_super_admin');
            }
        }

        $roles = $user->getRoles();
        $roles[] = new SwitchUserRole('ROLE_PREVIOUS_ADMIN', $this->tokenStorage->getToken());

        $token = new UsernamePasswordToken($user, $user->getPassword(), $this->providerKey, $roles);

        if (null !== $this->dispatcher) {
            $switchEvent = new SwitchUserEvent($request, $token->getUser());
            $this->dispatcher->dispatch(SecurityEvents::SWITCH_USER, $switchEvent);
        }

        return $token;
    }

    /**
     * Attempts to exit from an already switched user.
     *
     * @param Request $request A Request instance
     *
     * @throws AuthenticationCredentialsNotFoundException
     *
     * @return TokenInterface The original TokenInterface instance
     */
    private function attemptExitUser(Request $request)
    {
        if (false === $original = $this->getOriginalToken($this->tokenStorage->getToken())) {
            throw new AuthenticationCredentialsNotFoundException('Could not find original Token object.');
        }

        if (null !== $this->dispatcher && $original->getUser() instanceof UserInterface) {
            $user = $this->provider->refreshUser($original->getUser());
            $switchEvent = new SwitchUserEvent($request, $user);
            $this->dispatcher->dispatch(SecurityEvents::SWITCH_USER, $switchEvent);
        }

        return $original;
    }

    /**
     * Gets the original Token from a switched one.
     *
     * @param TokenInterface $token A switched TokenInterface instance
     *
     * @return TokenInterface|false The original TokenInterface instance, false if the current TokenInterface is not switched
     */
    private function getOriginalToken(TokenInterface $token)
    {
        foreach ($token->getRoles() as $role) {
            if ($role instanceof SwitchUserRole) {
                return $role->getSource();
            }
        }

        return false;
    }
}
