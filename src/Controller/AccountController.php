<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller;

use App\Entity\Account\Group;
use App\Entity\Account\User;
use App\Form\Account\RolesType;
use App\Menu\AccountMenu;
use App\Repository\UserRepository;
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
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
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

    /**
     * Show all Account.
     *
     * @IsGranted("ROLE_ACCOUNT_LIST")
     * @Route(name="admin_account_list", path="/account")
     */
    public function list(Request $request, UserRepository $userRepo, ConfigBag $bag, PaginatorInterface $paginator): Response
    {
        // Query
        $query = $userRepo->filter();

        // Check Owner or All Access
        if (!$this->isGranted('ADMIN_ACCOUNT_ALLREAD')) {
            $query->andWhere('u.id = :id')->setParameter('id', $this->getUser()->getId());
        }

        // Add Filter
        if ($request->get('status')) {
            $query->andWhere('u.isActive = :status')->setParameter('status', $request->get('filter'));
        }
        if ($request->get('filter')) {
            $query
                ->where('(u.email LIKE :filter) or (p.firstname LIKE :filter) or (p.lastname LIKE :filter) or (p.phone LIKE :filter) or (p.company LIKE :filter)')
                ->setParameter('filter', "%{$request->get('filter')}%");
        }

        // Get Result
        $pagination = $paginator->paginate($query->getQuery(),
            $request->query->getInt('page', 1),
            $bag->get('list_count')
        );

        // Render Page
        return $this->render('Admin/Account/list.html.twig', [
            'users' => $pagination,
            'filterForm' => $this->createUserFilterForm()->createView(),
        ]);
    }

    /**
     * Create User Filter Form.
     */
    private function createUserFilterForm(): FormInterface
    {
        return $this->get('form.factory')
            ->createNamedBuilder('', FormType::class, null, [
                'csrf_protection' => false,
                'method' => 'get',
                'allow_extra_fields' => true,
            ])
            ->add('filter', TextType::class, [
                'label' => 'search_keyword',
                'attr' => ['placeholder' => 'search_keyword_account_placeholder'],
                'required' => false,
            ])
            ->add('status', ChoiceType::class, [
                'label' => 'account_status',
                'choices' => [
                    'select_all' => null,
                    'deactive' => '0',
                    'active' => '1',
                ],
            ])
            ->getForm();
    }

    /**
     * Edit the User.
     *
     * @IsGranted("ROLE_ACCOUNT_EDIT")
     * @Route(name="admin_account_edit", path="/account/{user}")
     */
    public function edit(Request $request, ParameterBagInterface $bag, EntityManagerInterface $em, User $user): Response
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
            $em->persist($user);
            $em->flush();

            // Change Site Language
            if ($this->getUser()->getId() === $user->getId()) {
                $request->getSession()->set('_locale', $form->get('profile')['language']->getData());
            }

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_edit_title',
            'page_description' => sprintf('%s - %s', $user->getProfile()->getFullName(), $user->getEmail()),
            'page_menu' => AccountMenu::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Password.
     *
     * @IsGranted("ROLE_ACCOUNT_PASSWORD")
     * @Route(name="admin_account_password", path="/account/{user}/password")
     */
    public function changePassword(Request $request, User $user, EntityManagerInterface $em, UserPasswordEncoderInterface $encoder): Response
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
            $em->persist($user);
            $em->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_change_password_title',
            'page_description' => sprintf('%s - %s', $user->getProfile()->getFullName(), $user->getEmail()),
            'page_menu' => AccountMenu::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Change User Private Roles.
     *
     * @IsGranted("ROLE_ACCOUNT_ROLES")
     * @Route(name="admin_account_roles", path="/account/{user}/roles")
     */
    public function roles(Request $request, User $user, EntityManagerInterface $em, SecurityService $security): Response
    {
        dump(array_intersect($security->getACL(), $user->getRolesUser()));

        // Set Form & Request
        $form = $this->createForm(RolesType::class, null, [
            'roles' => $security->getRoles(),
            'acl' => $security->getACL(),
            'userRoles' => $user->getRolesUser(),
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
            $em->persist($user);
            $em->flush();

            // View Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_roles_title',
            'page_description' => sprintf('%s - %s', $user->getProfile()->getFullName(), $user->getEmail()),
            'page_menu' => AccountMenu::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Account Append Group.
     *
     * @IsGranted("ROLE_ACCOUNT_GROUP")
     * @Route(name="admin_account_group", path="/account/{user}/group")
     */
    public function addGroup(Request $request, EntityManagerInterface $em, User $user): Response
    {
        // Get Group Name
        $groupName = $user->getGroupNames();

        // Create Form
        $form = $this->createFormBuilder()
            ->add('group', EntityType::class, [
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_attr' => static function (Group $obj) use ($groupName) {
                    return \in_array($obj->getName(), $groupName, true) ? ['selected' => ''] : [];
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
            $em->persist($user);
            $em->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Redirect
            return $this->redirectToRoute('admin_account_group', ['user' => $user->getId()]);
        }

        // Render
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_add_group_title',
            'page_description' => sprintf('%s - %s', $user->getProfile()->getFullName(), $user->getEmail()),
            'page_menu' => AccountMenu::class,
            'form' => $form->createView(),
            'item' => $user,
        ]);
    }

    /**
     * Delete Account.
     *
     * @IsGranted("ROLE_ACCOUNT_DELETE")
     * @Route(name="admin_account_delete", path="/accounts/{user}/delete")
     */
    public function delete(Request $request, EntityManagerInterface $em, User $user): RedirectResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Remove
        $em->remove($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'remove_complete');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_account_list')));
    }

    /**
     * Activate/Deactivate Account.
     *
     * @IsGranted("ROLE_ACCOUNT_ACTIVATE")
     * @Route(name="admin_account_activate", path="/account/{user}/activate")
     */
    public function activate(Request $request, EntityManagerInterface $em, User $user): RedirectResponse
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setEnabled(!$user->isEnabled());

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
     *
     * @IsGranted("ROLE_ACCOUNT_FREEZE")
     * @Route(name="admin_account_freeze", path="/account/{user}/freeze")
     */
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
     *
     * @param $access
     */
    private function checkOwner(UserInterface $user, $access): void
    {
        if (!$this->isGranted($access) && $user->getId() !== $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
    }
}
