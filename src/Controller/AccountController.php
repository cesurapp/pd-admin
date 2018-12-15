<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 *
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 *
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller;

use App\Entity\Account\Group;
use App\Entity\Account\Profile;
use App\Entity\Account\User;
use App\Manager\SecurityManager;
use Knp\Component\Pager\PaginatorInterface;
use Pd\UserBundle\Form\ChangePasswordType;
use Pd\UserBundle\Form\ProfileType;
use Pd\UserBundle\Model\UserInterface;
use Pd\WidgetBundle\Widget\WidgetInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Controller managing the user profile.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class AccountController extends AbstractController
{
    /**
     * Security Manager Add Custom Roles.
     */
    const CUSTOM_ROLES = [
        'ROLE_ACCOUNT_ALLREAD',
        'ROLE_ACCOUNT_ALLWRITE',
    ];

    /**
     * Show all Account.
     *
     * @param Request $request
     *
     * @param PaginatorInterface $paginator
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ROLE_ACCOUNT_LIST")
     * @Route(name="account_list", path="/account")
     */
    public function list(Request $request, PaginatorInterface $paginator)
    {
        // Query
        $query = $this
            ->getDoctrine()
            ->getRepository(User::class)
            ->createQueryBuilder('u')
            ->leftJoin('u.profile', 'p')
            ->addSelect('p');

        // Check Owner or All Access
        if (!$this->isGranted('ADMIN_ACCOUNT_ALLREAD')) {
            $query
                ->andWhere('u.id = :id')
                ->setParameter('id', $this->getUser()->getId());
        }

        // Add Filter
        if ($request->get('filter')) {
            $query
                ->where('(u.email LIKE :filter) or (p.firstname LIKE :filter) or (p.lastname LIKE :filter) or (p.phone LIKE :filter) or (p.company LIKE :filter)')
                ->setParameter('filter', "%{$request->get('filter')}%");
        }
        if ($request->get('status')) {
            $query
                ->andWhere('u.isActive = :status')
                ->setParameter('status', $request->get('filter'));
        }

        // Get Result
        $pagination = $paginator->paginate(
            $query->getQuery(),
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        // Set Back URL
        $this->get('session')->set('backUrl', $request->getRequestUri());

        // Render Page
        return $this->render('Admin/Account/list.html.twig', [
            'users' => $pagination,
            'filterForm' => $this->createUserFilterForm()->createView(),
        ]);
    }

    /**
     * Create User Filter Form.
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createUserFilterForm()
    {
        $form = $this->get('form.factory')
            ->createNamedBuilder(null, FormType::class, null, [
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

        return $form;
    }

    /**
     * Edit the User.
     *
     * @param Request $request
     * @param User    $user
     *
     * @IsGranted("ROLE_ACCOUNT_EDIT")
     * @Route(name="account_edit", path="/account/edit/{user}")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function edit(Request $request, User $user)
    {
        // Check Read Only
        $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLREAD');

        // Create Form
        $form = $this->createForm(ProfileType::class, $user, [
            'data_class' => User::class,
            'profile_class' => Profile::class,
            'container' => $this->container,
        ]);

        // Handle Request
        $form->handleRequest($request);

        // Form Check
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin & Check All Write
            $this->checkAllAccess($user);
            $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLWRITE');

            // Save
            $em = $this->getDoctrine()->getManager();
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
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Change User Password.
     *
     * @param Request $request
     * @param User $user
     *
     * @param UserPasswordEncoderInterface $encoder
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ROLE_ACCOUNT_CHANGEPASSWORD")
     * @Route(name="account_changepassword", path="/account/changepassword/{user}")
     */
    public function changePassword(Request $request, User $user, UserPasswordEncoderInterface $encoder)
    {
        // Check Read Only
        $this->checkOwner($user, 'ADMIN_ACCOUNT_ALLREAD');

        // Create Form
        $form = $this->createForm(ChangePasswordType::class, $user, [
            'data_class' => User::class,
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
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/changePassword.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Change User Private Roles.
     *
     * @param Request $request
     * @param User $user
     *
     * @param RouterInterface $router
     * @param WidgetInterface $widget
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\Common\Annotations\AnnotationException
     * @throws \ReflectionException
     *
     * @IsGranted("ROLE_ACCOUNT_ROLES")
     * @Route(name="account_roles", path="/account/role/{user}")
     */
    public function roles(Request $request, User $user, RouterInterface $router, WidgetInterface $widget)
    {
        // Find All Roles
        $security = new SecurityManager($router, $widget);
        $roles = $security->getRoles();

        // Create Form
        $ACL = $security->getACL();
        $form = $this->createFormBuilder([])
            ->add('ACL', ChoiceType::class, [
                'label' => false,
                'multiple' => false,
                'expanded' => true,
                'choices' => $ACL,
                'choice_label' => function ($val, $key, $index) {
                    return $key.'.title';
                },
                'data' => key(array_intersect($ACL, $user->getRolesUser())),
            ])
            ->add('ACLProcess', ChoiceType::class, [
                'label' => false,
                'multiple' => true,
                'expanded' => true,
                'choices' => [
                    'ROLE_ALLOWED_TO_SWITCH.title' => 'ROLE_ALLOWED_TO_SWITCH',
                ],
                'data' => $user->getRolesUser(),
                'required' => false,
            ])
            ->add('Submit', SubmitType::class, [
                'label' => 'save',
                'attr' => ['class' => 'btn-primary'],
            ]);

        // Add Form Items
        if (\count($roles)) {
            foreach ($roles as $roleGroup => $access) {
                $form->add($roleGroup, ChoiceType::class, [
                    'label' => false,
                    'multiple' => true,
                    'expanded' => true,
                    'choices' => $access,
                    'choice_label' => function ($val, $key, $index) use ($roleGroup) {
                        return $roleGroup.'.'.$key;
                    },
                    'data' => $user->getRolesUser(),
                ]);
            }
        }

        // Set Form & Request
        $form = $form->getForm();
        $form->handleRequest($request);

        // Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Check Super Admin
            $this->checkAllAccess($user);

            // User Add Roles
            $addRoles = [];
            foreach ($form->getData() as $roleName => $roles) {
                if ($roles) {
                    if (!\is_array($roles)) {
                        $roles = [$roles];
                    }

                    // Add Role Group
                    if ('ACL' !== $roleName && 'ACLProcess' !== $roleName) {
                        array_push($roles, $roleName);
                    }

                    $addRoles = array_merge($addRoles, $roles);
                }
            }
            $user->setRoles($addRoles);

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // View Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/roles.html.twig', [
            'form' => $form->createView(),
            'roles' => $roles,
            'user' => $user,
        ]);
    }

    /**
     * Account Append Group.
     *
     * @param Request $request
     * @param User    $user
     *
     * @IsGranted("ROLE_ACCOUNT_ADDGROUP")
     * @Route(name="account_addgroup", path="/account/addGroup/{user}")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function addGroup(Request $request, User $user)
    {
        // Get Group Name
        $groupName = $user->getGroupNames();

        // Create Form
        $form = $this->createFormBuilder(null)
            ->add('group', EntityType::class, [
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_attr' => function ($obj) use ($groupName) {
                    return (\in_array($obj->getName(), $groupName, true)) ? ['selected' => ''] : [];
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
        $form->handleRequest($request);

        // Form Request
        if ($form->isSubmitted() && $form->isValid()) {
            // Add user to group
            $user->getGroups()->clear();
            foreach ($form->get('group')->getData() as $group) {
                $user->addGroup($group);
            }

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Redirect
            return $this->redirectToRoute('admin_account_addgroup', ['user' => $user->getId()]);
        }

        // Render
        return $this->render('Admin/Account/addGroup.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Delete Account.
     *
     * @param Request $request
     * @param User    $user
     *
     * @IsGranted("ROLE_ACCOUNT_DELETE")
     * @Route(name="account_delete", path="/accounts/delete/{user}")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function delete(Request $request, User $user)
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Remove
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'remove_complete');

        // Redirect back
        return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('admin_account_list'));
    }

    /**
     * Activate/Deactivate Account.
     *
     * @param Request $request
     * @param User    $user
     * @param $status
     *
     * @IsGranted("ROLE_ACCOUNT_ACTIVATE")
     * @Route(name="account_activate", path="/account/activate/{user}/{status}")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function activate(Request $request, User $user, $status)
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setEnabled($status);

        // Update
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('admin_account_list'));
    }

    /**
     * Freeze Account.
     *
     * @param Request $request
     * @param User    $user
     * @param $status
     *
     * @IsGranted("ROLE_ACCOUNT_FREEZE")
     * @Route(name="account_freeze", path="/account/freeze/{user}/{status}")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function freeze(Request $request, User $user, $status)
    {
        // Check All Access
        $this->checkAllAccess($user);

        // Activate / Deactivate
        $user->setFreeze((bool) $status);

        // Update
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('admin_account_list'));
    }

    /**
     * Check Current User All Access.
     *
     * @param UserInterface $user
     */
    private function checkAllAccess(UserInterface $user)
    {
        if ($user->hasRole(User::ROLE_ALL_ACCESS) && !$this->getUser()->hasRole(User::ROLE_ALL_ACCESS)) {
            throw $this->createAccessDeniedException();
        }
    }

    /**
     * Check Current User Read Only.
     *
     * @param UserInterface $user
     * @param $access
     */
    private function checkOwner(UserInterface $user, $access)
    {
        if (!$this->isGranted($access)) {
            if ($user->getId() !== $this->getUser()->getId()) {
                throw $this->createAccessDeniedException();
            }
        }
    }
}
