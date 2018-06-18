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

namespace App\Admin\Controller\Account;

use App\Admin\Entity\Account\Group;
use App\Admin\Entity\Account\Profile;
use App\Admin\Entity\Account\User;
use App\Admin\Services\Security;
use Pd\UserBundle\Form\ChangePasswordType;
use Pd\UserBundle\Form\ProfileType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller managing the user profile.
 *
 * routing : /admin/accounts/*
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class AccountController extends Controller
{
    /**
     * Show all Account.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_LIST")
     */
    public function list(Request $request)
    {
        // Filter Query
        $filterForm = $this->createUserFilterForm()->handleRequest($request);

        // Get Query
        $query = $this->getDoctrine()
            ->getRepository(User::class)
            ->filterUser($filterForm->getData());

        // Get Result
        $pagination = $this->get('knp_paginator');
        $pagination = $pagination->paginate(
            $query,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        // Set Back URL
        $this->get('session')->set('backUrl', $request->getRequestUri());

        // Render
        return $this->render('@Admin/Account/list.html.twig', [
            'users' => $pagination,
            'filterForm' => $filterForm->createView(),
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
     * @param User    $user
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_EDIT")
     */
    public function edit(User $user, Request $request)
    {
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
            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Change Site Language
            $request->getSession()->set('_locale', $form->get('profile')['language']->getData());

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        return $this->render('@Admin/Account/edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Change User Password.
     *
     * @param User    $user
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_CHANGEPASSWORD")
     */
    public function changePassword(User $user, Request $request)
    {
        // Create Form
        $form = $this->createForm(ChangePasswordType::class, $user, [
            'data_class' => User::class,
            'disable_current_password' => $this->isGranted(User::ROLE_ALL_ACCESS) || $this->isGranted('ROLE_ALLOWED_TO_SWITCH'),
        ]);

        // Handle Request
        $form->handleRequest($request);

        // Form Submit & Valid
        if ($form->isSubmitted() && $form->isValid()) {
            // Encode Password
            $encoder = $this->get('security.password_encoder');
            $password = $encoder->encodePassword($user, $form->get('plainPassword')->getData());
            $user->setPassword($password);

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            // Flash Message
            $this->addFlash('success', 'changes_saved');
        }

        return $this->render('@Admin/Account/changePassword.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Change User Private Roles.
     *
     * @param User    $user
     * @param Request $request
     *
     * @throws \Doctrine\Common\Annotations\AnnotationException
     * @throws \ReflectionException
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_ROLES")
     */
    public function roles(User $user, Request $request)
    {
        // All Roles
        $security = new Security($this->container);
        $roles = $security->getRoles();

        // Create Form
        $ACL = $security->getACL();

        $form = $this->createFormBuilder([])
            ->add('ACL', ChoiceType::class, [
                'label' => false,
                'multiple' => false,
                'expanded' => true,
                'choices' => $ACL,
                'choice_label' => function ($value, $key, $index) {
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
                    'choice_label' => function ($value, $key, $index) use ($roleGroup) {
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

            /* View Message */
            $this->addFlash('success', 'changes_saved');
        }

        return $this->render('@Admin/Account/roles.html.twig', [
            'form' => $form->createView(),
            'roles' => $roles,
            'user' => $user,
        ]);
    }

    /**
     * Account Append Group.
     *
     * @param User    $user
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_ADDGROUP")
     */
    public function addGroup(User $user, Request $request)
    {
        /** Get User Group Name */
        $groupName = $user->getGroupNames();

        /** Create Form */
        $form = $this->createFormBuilder(null)
            ->add('group', EntityType::class, [
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_attr' => function ($obj) use ($groupName) {
                    return (in_array($obj->getName(), $groupName, true)) ? ['selected' => ''] : [];
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

        /* Form Request */
        if ($form->isSubmitted() && $form->isValid()) {
            /* Add user to group */
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

        /* Render */
        return $this->render('@Admin/Account/addGroup.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }

    /**
     * Delete Account.
     *
     * @param User    $user
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_DELETE")
     */
    public function delete(User $user, Request $request)
    {
        // Remove
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'remove_complete');

        // Redirect back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_account_list'));
    }

    /**
     * Activate/Deactivate Account.
     *
     * @param User $user
     * @param $status
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @IsGranted("ADMIN_ACCOUNT_ACTIVATE")
     */
    public function activate(Request $request, User $user, $status)
    {
        // Activate / Deactivate
        $user->setEnabled($status);

        // Update
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // Flash Message
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_account_list'));
    }
}
