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

namespace App\Auth\Command;

use App\Auth\Entity\Profile;
use App\Auth\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Create New User.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class CreateUserCommand extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * CreateUserCommand constructor.
     *
     * @param EntityManagerInterface $entityManager
     * @param ContainerInterface     $container
     */
    public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container)
    {
        $this->em = $entityManager;
        $this->container = $container;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('user:create')
            ->setDescription('Application create user.')
            ->addArgument('email', InputArgument::OPTIONAL, 'Email address')
            ->addArgument('password', InputArgument::OPTIONAL, 'User password')
            ->addArgument('role', InputOption::VALUE_OPTIONAL, 'User Role');
    }

    protected function interact(InputInterface $input, OutputInterface $output)
    {
        if (!$input->getArgument('email')) {
            $question = new Question('Email Adress: ', 'demo@demo.com');
            $answer = $this->getHelper('question')->ask($input, $output, $question);
            $input->setArgument('email', $answer);
        }

        if (!$input->getArgument('password')) {
            $question = new Question('Password: ', '123123');
            $answer = $this->getHelper('question')->ask($input, $output, $question);
            $input->setArgument('password', $answer);
        }

        if (!$input->getArgument('role')) {
            $question = new ChoiceQuestion('Roles: ', ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'], 2);
            $answer = $this->getHelper('question')->ask($input, $output, $question);
            $input->setArgument('role', $answer);
        }
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // Create User
        $user = (new User())
            ->setEnabled(true)
            ->setEmail($input->getArgument('email'))
            ->addRole($input->getArgument('role'))
            ->setProfile((new Profile())
                ->setFirstname('Demo')
                ->setLastname('Account'));

        // Set Password
        $password = $this->container->get('security.password_encoder')->encodePassword($user, $input->getArgument('password'));
        $user->setPassword($password);

        // Save
        $this->em->persist($user);
        $this->em->flush();

        // Output
        $output->writeln('Created User:');
        $output->writeln(sprintf('Email: <comment>%s</comment>', $user->getUsername()));
        $output->writeln(sprintf('Password: <comment>%s</comment>', $input->getArgument('password')));
        $output->writeln(sprintf('Role: <comment>%s</comment>', $input->getArgument('role')));
    }
}
