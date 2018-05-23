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
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Tests\Auth;

use App\Auth\Entity\Profile;
use App\Auth\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Authorization Tests.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class SecurityControllerTest extends WebTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $em;

    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    private $container;

    /**
     * Constructor.
     */
    public function setUp()
    {
        $kernel = self::bootKernel();
        $this->em = $kernel->getContainer()->get('doctrine')->getManager();
        $this->container = $kernel->getContainer();
    }

    /**
     * Close Database.
     */
    protected function tearDown()
    {
        parent::tearDown();

        $this->em->close();
        $this->em = null;
    }

    /**
     * Login Test.
     */
    public function testLogin()
    {
        // Create User
        $user = $this->createUser();

        // Create Client
        $client = static::createClient();

        // Request and Get Form
        $form = $client
            ->request('GET', $client->getContainer()->get('router')->generate('security_login'))
            ->filter('form[action*=login]')
            ->form([
                '_username' => $user->getUsername(),
                '_password' => '123123',
            ]);

        // Submit Form
        $client->submit($form);
        $client->followRedirect();

        // Assertions
        $this->assertTrue($client->getResponse()->isSuccessful());

        // Remove User
        $this->removeUser($user->getUsername());
    }

    /**
     * Register Test.
     */
    public function testRegister()
    {
        $username = 'user'.uniqid().'@unittest.com';
        $password = '123123';

        // Create Client
        $client = static::createClient();

        // Request and Get Form
        $form = $client
            ->request('GET', $client->getContainer()->get('router')->generate('security_register'))
            ->filter('form[name*=register]')
            ->form([
                'register[email]' => $username,
                'register[plainPassword][first]' => $password,
                'register[plainPassword][second]' => $password,
                'register[profile][firstname]' => 'PHPUnit',
                'register[profile][lastname]' => 'Register Test',
            ]);

        // Submit Form
        $client->submit($form);

        // Assertions
        $newUser = $this->em->getRepository('Auth:User')->findOneBy(['email' => $username]);
        $this->assertNotNull($newUser, 'User not registered');

        // Delete User
        $this->removeUser($username);
    }

    /**
     * Test Register Confirmation.
     */
    public function testRegisterConfirm()
    {
        // Create User
        $user = $this->createUser(false);

        // Create Token & Save
        $user->createConfirmationToken();
        $this->em->persist($user);
        $this->em->flush();

        // Create Client
        $client = static::createClient();

        // Request
        $request = $client->request('GET', $this->container->get('router')->generate('security_register_confirm', ['token' => $user->getConfirmationToken()]));

        // Assertions
        $userReload = $this->em->getRepository('Auth:User')->findOneBy(['email' => $user->getUsername()]);
        $this->assertTrue($userReload->isEnabled());

        // Remove User
        $this->removeUser($user->getUsername());
    }

    /**
     * Test Forgotten Password.
     */
    public function testForgotPassword()
    {
        // Create User
        $user = $this->createUser(true);

        // Create Client
        $client = static::createClient();

        // Request and Get Form
        $form = $client
            ->request('GET', $this->container->get('router')->generate('security_resetting'))
            ->filter('form[name*=resetting]')
            ->form([
                'resetting[username]' => $user->getUsername(),
            ]);

        // Submit Form
        $client->submit($form);

        // Assertions
        $userReload = $this->em->getRepository('Auth:User')->findOneBy(['email' => $user->getUsername()]);
        $this->assertNotEmpty($userReload->getConfirmationToken());
        $this->assertNotEmpty($userReload->getPasswordRequestedAt()->getTimestamp());

        // Remove User
        $this->removeUser($user->getUsername());
    }

    /**
     * Test Forgot Password Token.
     */
    public function testForgotPasswordToken()
    {
        // Create User
        $user = $this->createUser(true);

        // Set Confirmation Token
        $user->setEnabled(true)
            ->createConfirmationToken()
            ->setPasswordRequestedAt(new \DateTime());

        // Update User
        $this->em->persist($user);
        $this->em->flush();

        // Create Client
        $client = static::createClient();

        // Request
        $form = $client
            ->request('GET', $this->container->get('router')->generate('security_resetting_password', ['token' => $user->getConfirmationToken()]))
            ->filter('form[name*=resetting_password]')
            ->form([
                'resetting_password[plainPassword][first]' => '123123',
                'resetting_password[plainPassword][second]' => '123123',
            ]);

        //Submit Form
        $client->submit($form);

        // Assertions
        $userReload = $this->em->getRepository('Auth:User')->findOneBy(['email' => $user->getUsername()]);
        $this->assertNull($userReload->getConfirmationToken());
        $this->assertNull($userReload->getPasswordRequestedAt());

        // Remove User
        $this->removeUser($user->getUsername());
    }

    /**
     * Create New User to Database.
     *
     * @param bool $enabled
     *
     * @return User
     */
    private function createUser($enabled = true)
    {
        // New User
        $user = (new User())
            ->setUsername('user'.uniqid().'@unittest.com')
            ->setEnabled($enabled)
            ->setProfile((new Profile())
                ->setFirstname('UnitTest')
                ->setLastname('Login Test')
            )
            ->addRole('ROLE_SUPER_ADMIN');

        // Set Password
        $user->setPassword($this->container->get('security.password_encoder')->encodePassword($user, '123123'));

        // Save
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    /**
     * Remove User to Database.
     *
     * @param $username
     *
     * @return bool
     */
    private function removeUser($username)
    {
        $user = $this->em->getRepository('Auth:User')->findOneBy(['email' => $username]);

        if (null !== $user) {
            $this->em->remove($user);
            $this->em->flush();

            return true;
        }

        return false;
    }
}
