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
use App\Form\Account\RolesType;
use App\Menu\Account\Navigation;
use App\Repository\Account\UserRepository;
use App\Service\ConfigBag;
use App\Service\SecurityService;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Pd\UserBundle\Form\ChangePasswordType;
use Pd\UserBundle\Form\ProfileType;
use Pd\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
        'ROLE_ACCOUNT_ALLREAD',
        'ROLE_ACCOUNT_ALLWRITE',
    ];

    public function __construct(
        private EntityManagerInterface $entityManager,
        private ConfigBag $bag
    )
    {
    }


    /**
     * Show all Account.
     */
    #[Route('/account', name: 'admin_account_list')]
    #[IsGranted(['ROLE_ACCOUNT_LIST'])]
    public function list(Request $request, UserRepository $userRepo, PaginatorInterface $paginator): Response
    {
        // Query
        $query = $userRepo->filter($request);

        // Check Owner or All Access
        if (!$this->isGranted('ADMIN_ACCOUNT_ALLREAD')) {
            $query->andWhere('u.id = :id')->setParameter('id', $this->getUser()->getId());
        }

        // Get Result
        $pagination = $paginator->paginate($query->getQuery(),
            $request->query->getInt('page', 1),
            $this->bag->get('list_count')
        );

        // Render Page
        return $this->render('admin/account/list.html.twig', [
            'users' => $pagination,
        ]);
    }

    /**
     * Edit the User.
     */
    #[Route('/account/{user}', name: 'admin_account_edit')]
    #[IsGranted(['ROLE_ACCOUNT_EDIT'])]
    public function edit(Request $request, ParameterBagInterface $bag, User $user): Response
    {
        // Check Read Only
        $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLREAD');

        // Create Form
        $form = $this->createForm(ProfileType::class, $user, [
            'parameter_bag' => $bag,
        ]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin & Check All Write
            $this->checkAllAccess($user);
            $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLWRITE');

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Change Site Language
            if ($this->getUser()->getId() === $user->getId()) {
                $request->getSession()->set('_locale', $form->get('profile')['language']->getData());
            }

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'page_title' => 'account_edit_title',
            'page_menu' => Navigation::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Password.
     */
    #[Route('/account/{user}/password', name: 'admin_account_password')]
    #[IsGranted(['ROLE_ACCOUNT_PASSWORD'])]
    public function changePassword(Request $request, User $user, UserPasswordEncoderInterface $encoder): Response
    {
        // Check Read Only
        $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLREAD');

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
            $this->checkAllAccess($user);
            $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLWRITE');

            // Encode Password
            $password = $encoder->encodePassword($user, $form->get('plainPassword')->getData());
            $user->setPassword($password);

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'page_title' => 'account_change_password_title',
            'page_menu' => Navigation::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Private Roles.
     */
    #[Route('/account/{user}/roles', name: 'admin_account_roles')]
    #[IsGranted(['ROLE_ACCOUNT_ROLES'])]
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
            $this->checkAllAccess($user);

            // User Add Roles
            $roles = $form->get('roles')->getData();
            if ($form->has('acl')) {
                $roles = array_merge($roles, [$form->get('acl')->getData()]);
                $roles = array_merge($roles, $form->get('aclprocess')->getData());
            }
            if ($roles) {
                $user->setRoles($roles);
            }

            // Save
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // View Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('admin/account/edit.html.twig', [
            'page_title' => 'account_roles_title',
            'page_menu' => Navigation::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Account Append Group.
     */
    #[Route('/account/{user}/group', name: 'admin_account_group')]
    #[IsGranted(['ROLE_ACCOUNT_GROUP'])]
    public function addGroup(Request $request, User $user): Response
    {
        // Get Group Name
        $groupName = $user->getGroupNames();

        // Create Form
        $form = $this->createFormBuilder()
            ->add('group', EntityType::class, [
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_attr' => static function (Group $obj) use ($groupName) {
                    return in_array($obj->getName(), $groupName, true) ? ['selected' => ''] : [];
                },
                'label' => 'account_groups',
                'multiple' => true,
                'expanded' => false,
                'choice_translation_domain' => false,
                'required' => false,
            ])
            ->add('Submit', SubmitType::class, [
                'label' => 'save',
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
            $this->addFlash('success', 'changes_saved');

            // Redirect
            return $this->redirectToRoute('admin_account_group', ['user' => $user->getId()]);
        }

        // Render
        return $this->render('admin/account/edit.html.twig', [
            'page_title' => 'account_add_group_title',
            'page_menu' => Navigation::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Delete Account.
     */
    #[Route('/accounts/{user}/delete', name: 'admin_account_delete')]
    #[IsGranted(['ROLE_ACCOUNT_DELETE'])]
    public function delete(Request $request, User $user): RedirectResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Remove
        $this->entityManager->remove($user);
        $this->entityManager->flush();

        // Flash Message
        $this->addFlash('success', 'remove_complete');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_account_list')));
    }

    /**
     * Activate/Deactivate Account.
     */
    #[Route('/account/{user}/activate', name: 'admin_account_activate')]
    #[IsGranted(['ROLE_ACCOUNT_ACTIVATE'])]
    public function activate(Request $request, EntityManagerInterface $em, User $user): RedirectResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setActive(!$user->isActive());

        // Update
        $em->persist($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_account_list')));
    }

    /**
     * Freeze Account.
     */
    #[Route('/account/{user}/freeze', name: 'admin_account_freeze')]
    #[IsGranted(['ROLE_ACCOUNT_FREEZE'])]
    public function freeze(Request $request, EntityManagerInterface $em, User $user): RedirectResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setFreeze(!$user->isFreeze());

        // Update
        $em->persist($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_account_list')));
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
