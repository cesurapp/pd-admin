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
use App\Manager\SecurityManager;
use Pd\UserBundle\Form\GroupType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller managing the groups.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class GroupController extends Controller
{
    /**
     * List Groups.
     *
     * @param Request $request
     *
     * @IsGranted("ROLE_GROUP_LIST")
     * @Route(name="account_group_list", path="/account/group")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function list(Request $request)
    {
        // Get Groups
        $query = $this
            ->getDoctrine()
            ->getRepository(Group::class)
            ->createQueryBuilder('g');

        // Get Result
        $pagination = $this->get('knp_paginator');
        $pagination = $pagination->paginate(
            $query,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        // Set Back URL
        $this->get('session')->set('backUrl', $request->getRequestUri());

        // Render Page
        return $this->render('Admin/Account/Groups/list.html.twig', [
            'groups' => $pagination,
        ]);
    }

    /**
     * Edit Group.
     *
     * @param Group   $group
     * @param Request $request
     *
     * @IsGranted("ROLE_GROUP_EDIT")
     * @Route(name="account_group_edit", path="/account/group/edit/{group}")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function edit(Group $group, Request $request)
    {
        // Create Form
        $form = $this->createForm(GroupType::class, $group, [
            'data_class' => Group::class,
        ]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($group);
            $em->flush();

            // Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/Groups/edit.html.twig', [
            'form' => $form->createview(),
            'group' => $group,
        ]);
    }

    /**
     * Create New Group.
     *
     * @param Request $request
     *
     * @IsGranted("ROLE_GROUP_NEW")
     * @Route(name="account_group_new", path="/account/group/new")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function new(Request $request)
    {
        // Create Form
        $group = new Group(null);
        $form = $this->createForm(GroupType::class, $group);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($group);
            $em->flush();

            // Success Messagae
            $this->addFlash('success', 'changes_saved');

            // Redirect Edit
            return $this->redirectToRoute('admin_account_group_edit', ['group' => $group->getId()]);
        }

        // Render Page
        return $this->render('Admin/Account/Groups/new.html.twig', [
            'form' => $form->createview(),
        ]);
    }

    /**
     * Edit Group Roles.
     *
     * @param Group   $group
     * @param Request $request
     *
     * @IsGranted("ROLE_GROUP_ROLES")
     * @Route(name="account_group_roles", path="/account/group/roles/{group}")
     *
     * @throws \Doctrine\Common\Annotations\AnnotationException
     * @throws \ReflectionException
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function roles(Group $group, Request $request)
    {
        // All Roles
        $security = new SecurityManager($this->container);
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
                'data' => key(array_intersect($ACL, $group->getRoles())),
            ])
            ->add('ACLProcess', ChoiceType::class, [
                'label' => false,
                'multiple' => true,
                'expanded' => true,
                'choices' => [
                    'ROLE_ALLOWED_TO_SWITCH.title' => 'ROLE_ALLOWED_TO_SWITCH',
                ],
                'data' => $group->getRoles(),
                'required' => false,
            ])
            ->add('Submit', SubmitType::class, [
                'label' => 'save',
                'attr' => ['class' => 'btn-primary'],
            ]);

        //Add Form Items
        if (\count($roles)) {
            foreach ($roles as $role => $access) {
                $form->add($role, ChoiceType::class, [
                    'label' => false,
                    'multiple' => true,
                    'expanded' => true,
                    'choices' => $access,
                    'choice_label' => function ($val, $key, $index) use ($role) {
                        return $role.'.'.$key;
                    },
                    'data' => $group->getRoles(),
                ]);
            }
        }

        // Set Form & Request
        $form = $form->getForm();
        $form->handleRequest($request);

        // Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Group Add Roles
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
            $group->setRoles($addRoles);

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($group);
            $em->flush();

            // Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/Groups/roles.html.twig', [
            'form' => $form->createView(),
            'group' => $group,
            'roles' => $roles,
        ]);
    }

    /**
     * Delete Group.
     *
     * @param Group   $group
     * @param Request $request
     *
     * @IsGranted("ROLE_GROUP_DELETE")
     * @Route(name="account_group_delete", path="/account/group/delete/{group}")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function delete(Group $group, Request $request)
    {
        // Remove
        $em = $this->getDoctrine()->getManager();
        $em->remove($group);
        $em->flush();

        // Add Flash
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect(($r = $request->headers->get('referer')) ? $r : $this->generateUrl('admin_account_group_list'));
    }
}
