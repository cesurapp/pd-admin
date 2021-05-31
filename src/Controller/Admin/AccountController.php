<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller\Admin;

use App\Entity\Account\Group;
use App\Entity\Account\User;
use App\Form\Account\ChangePasswordType;
use App\Form\Account\ProfileType;
use App\Form\Account\RolesType;
use App\Repository\Account\UserRepository;
use App\Service\ConfigBag;
use App\Service\SecurityService;
use App\Tables\AccountListTable;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Controller managing the user profile.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class AccountController extends AbstractController
{
    /**
     * Security Manager Add Custom Roles.
     */
    public const CUSTOM_ROLES = [
        'ROLE_ACCOUNT_ALLREAD' => 'ROLE_ACCOUNT_ALLREAD',
        'ROLE_ACCOUNT_ALLWRITE' => 'ROLE_ACCOUNT_ALLWRITE',
    ];

    public function __construct(
        private EntityManagerInterface $entityManager,
        private ConfigBag $bag
    ) {
    }

    /**
     * Show all Account.
     *
     * @IsGranted("ROLE_ACCOUNT_LIST")
     */
    #[Route('/account', name: 'admin.account_list')]
    public function list(Request $request, AccountListTable $table, UserRepository $userRepo, PaginatorInterface $paginator): Response
    {
        $table
            ->handleQueryBuilder($query = $userRepo->createQueryBuilder('u'))
            ->handleRequest($request);

        // Check Owner or All Access
        if (!$this->isGranted('ROLE_ACCOUNT_ALLREAD')) {
            $query->andWhere('u.id = :id')->setParameter('id', $this->getUser()->getId());
        }

        // Paginate
        $pagination = $paginator->paginate($query->getQuery(),
            $request->query->getInt('page', 1),
            $this->bag->get('list_count')
        );

        if ($request->get('export')) {
            return $table->export();
        }

        return $request->isXmlHttpRequest() ?
            $this->json($pagination, context: ['groups' => 'default']) :
            $this->render('admin/account/list.html.twig', ['table' => $table]);
    }

    /**
     * Edit the User.
     *
     * @IsGranted("ROLE_ACCOUNT_EDIT")
     */
    #[Route('/account/{user}', name: 'admin.account_edit')]
    public function edit(Request $request, User $user): Response
    {
        // Check Read Only
        $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLREAD');

        // Create Form
        $form = $this->createForm(ProfileType::class, $user, [
            'active_language' => $this->bag->get('active_language'),
        ]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin & Check All Write
            $this->checkAllAccess($this->getUser());
            $this->checkOwner($this->getUser(), 'ADMIN_ACCOUNT_ALLWRITE');

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Change Site Language
            if ($this->getUser()->getId() === $user->getId()) {
                $request->getSession()->set('_locale', $form->get('language')->getData());
            }

            // Flash Message
            $this->addFlash('success', 'message.saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Password.
     *
     * @IsGranted("ROLE_ACCOUNT_PASSWORD")
     */
    #[Route('/account/{user}/password', name: 'admin.account_password')]
    public function changePassword(Request $request, User $user, UserPasswordHasherInterface $hasher): Response
    {
        // Check Read Only
        $this->checkOwner($this->getUser(), 'ADMIN_ACCOUNT_ALLREAD');

        // Create Form
        $form = $this->createForm(ChangePasswordType::class, $user, [
            'disable_current_password' => $this->isGranted(User::ROLE_ALL_ACCESS) ||
                $this->isGranted('ADMIN_ACCOUNT_ALLWRITE'),
        ]);

        // Handle Request
        $form->handleRequest($request);

        // Form Submit & Valid
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin & Check All Write
            $this->checkAllAccess($this->getUser());
            $this->checkOwner($this->getUser(), 'ADMIN_ACCOUNT_ALLWRITE');

            // Encode Password
            $password = $hasher->hashPassword($user, $form->get('plainPassword')->getData());
            $user->setPassword($password);

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Flash Message
            $this->addFlash('success', 'message.saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Private Roles.
     *
     * @IsGranted("ROLE_ACCOUNT_ROLES")
     */
    #[Route('/account/{user}/roles', name: 'admin.account_roles')]
    public function roles(Request $request, User $user, SecurityService $security): Response
    {
        // Set Form & Request
        $form = $this->createForm(RolesType::class, null, [
            'roles' => $security->getRoles(),
            'acl' => $security->getACL(),
            'userRoles' => $user->getRoles(true),
        ]);
        $form->handleRequest($request);

        // Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin
            $this->checkAllAccess($this->getUser());

            // User Add Roles
            $roles = $form->get('roles')->getData();
            if ($form->has('acl')) {
                $roles = array_merge($roles, [$form->get('acl')->getData()]);
                $roles = array_merge($roles, $form->get('aclProcess')->getData());
            }
            if ($roles) {
                if (!$this->getUser()->hasRole(User::ROLE_ALL_ACCESS)) {
                    $roles = array_intersect($user->getRoles(), $roles);
                }
                $user->setRoles($roles);
            }

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // View Message
            $this->addFlash('success', 'message.saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Account Append Group.
     *
     * @IsGranted("ROLE_ACCOUNT_GROUP")
     */
    #[Route('/account/{user}/group', name: 'admin.account_group')]
    public function addGroup(Request $request, User $user): Response
    {
        // Get Group Name
        $groupName = $user->getGroupNames();

        // Create Form
        $form = $this->createFormBuilder()
            ->add('group', EntityType::class, [
                'label' => 'account.edit.groups',
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_value' => 'id',
                'choice_attr' => static function (Group $obj) use ($groupName) {
                    return \in_array($obj->getName(), $groupName, true) ? ['selected' => ''] : [];
                },
                'multiple' => true,
                'expanded' => false,
                'choice_translation_domain' => false,
                'required' => false,
            ])
            ->add('Submit', SubmitType::class, [
                'label' => 'button.save',
            ])
            ->getForm();

        // Form Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Add user to group
            $user->getGroups()->clear();
            foreach ($form->get('group')->getData() as $group) {
                $user->addGroup($group);
            }

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Flash Message
            $this->addFlash('success', 'message.saved');

            // Redirect
            return $this->redirectToRoute('admin.account_group', ['user' => $user->getId()]);
        }

        // Render
        return $this->render('admin/account/edit.html.twig', [
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Delete Account.
     *
     * @IsGranted("ROLE_ACCOUNT_DELETE")
     */
    #[Route('/accounts/{user}/delete', name: 'admin.account_delete', methods: ['DELETE'])]
    public function delete(User $user): JsonResponse
    {
        // Check All Access
        $this->checkAllAccess($this->getUser());

        // Remove
        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['success' => true]);
    }

    /**
     * Activate/Deactivate Account.
     *
     * @IsGranted("ROLE_ACCOUNT_ACTIVATE")
     */
    #[Route('/account/{user}/activate', name: 'admin.account_activate', methods: ['POST'])]
    public function activate(User $user): JsonResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setActive(!$user->isActive());

        // Update
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json($user);
    }

    /**
     * Freeze Account.
     *
     * @IsGranted("ROLE_ACCOUNT_FREEZE")
     */
    #[Route('/account/{user}/freeze', name: 'admin.account_freeze', methods: ['POST'])]
    public function freeze(User $user): JsonResponse
    {
        // Check All Access
        $this->checkAllAccess($this->getUser());

        // Activate / Deactivate
        $user->setFreeze(!$user->isFreeze());
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json($user);
    }

    /**
     * Check Current User All Access.
     */
    private function checkAllAccess(UserInterface $user): void
    {
        if ($user->hasRole(User::ROLE_ALL_ACCESS) && !$this->getUser()->hasRole(User::ROLE_ALL_ACCESS)) {
            throw $this->createAccessDeniedException();
        }
    }

    /**
     * Check Current User Read Only.
     */
    private function checkOwner(UserInterface $user, $access): void
    {
        if (!$this->isGranted($access) && $user->getId() !== $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
    }
}
