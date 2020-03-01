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
use App\Form\Account\RolesType;
use App\Manager\SecurityManager;
use App\Menu\GroupsMenu;
use Knp\Component\Pager\PaginatorInterface;
use Pd\UserBundle\Form\GroupType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Controller managing the groups.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class GroupController extends AbstractController
{
    /**
     * List Groups.
     *
     * @IsGranted("ROLE_GROUP_LIST")
     * @Route(name="account_group_list", path="/account/group")
     */
    public function list(Request $request, PaginatorInterface $paginator): Response
    {
        // Get Groups
        $query = $this
            ->getDoctrine()
            ->getRepository(Group::class)
            ->createQueryBuilder('g');

        // Get Result
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', $this->getParameter('list_count'))
        );

        // Set Back URL
        $this->get('session')->set('backUrl', $request->getRequestUri());

        // Render Page
        return $this->render('Admin/Account/listGroup.html.twig', [
            'groups' => $pagination,
        ]);
    }

    /**
     * Edit Group.
     *
     * @IsGranted("ROLE_GROUP_EDIT")
     * @Route(name="account_group_edit", path="/account/group/edit/{group}")
     */
    public function edit(Group $group, Request $request): Response
    {
        // Create Form
        $form = $this->createForm(GroupType::class, $group);

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
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_group_edit_title',
            'page_description' => $group->getName(),
            'page_menu' => GroupsMenu::class,
            'form' => $form->createView(),
            'item' => $group,
        ]);
    }

    /**
     * Create New Group.
     *
     * @IsGranted("ROLE_GROUP_NEW")
     * @Route(name="account_group_new", path="/account/group/new")
     *
     * @return RedirectResponse|Response
     */
    public function new(Request $request, TranslatorInterface $translator)
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
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_group_edit_title',
            'page_description' => $translator->trans('account_group_new_desc'),
            'form' => $form->createView(),
        ]);
    }

    /**
     * Edit Group Roles.
     *
     * @IsGranted("ROLE_GROUP_ROLES")
     * @Route(name="account_group_roles", path="/account/group/roles/{group}")
     */
    public function roles(Group $group, Request $request, SecurityManager $security): Response
    {
        // Set Form & Request
        $form = $this->createForm(RolesType::class, null, [
            'roles' => $security->getRoles(),
            'acl' => $security->getACL(),
            'userRoles' => $group->getRoles(),
        ]);
        $form->handleRequest($request);

        // Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Add Roles
            $roles = $form->get('roles')->getData();
            if ($form->has('acl')) {
                $roles = array_merge($roles, [$form->get('acl')->getData()]);
                $roles = array_merge($roles, $form->get('aclprocess')->getData());
            }
            if ($roles) {
                $group->setRoles($roles);
            }

            // Save
            $em = $this->getDoctrine()->getManager();
            $em->persist($group);
            $em->flush();

            // Message
            $this->addFlash('success', 'changes_saved');
        }

        // Render Page
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_group_role_title',
            'page_description' => $group->getName(),
            'page_menu' => GroupsMenu::class,
            'form' => $form->createView(),
            'item' => $group,
        ]);
    }

    /**
     * Delete Group.
     *
     * @IsGranted("ROLE_GROUP_DELETE")
     * @Route(name="account_group_delete", path="/account/group/delete/{group}")
     */
    public function delete(Group $group, Request $request): RedirectResponse
    {
        // Remove
        $em = $this->getDoctrine()->getManager();
        $em->remove($group);
        $em->flush();

        // Add Flash
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_account_group_list')));
    }
}
