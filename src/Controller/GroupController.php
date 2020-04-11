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
use App\Menu\GroupsMenu;
use App\Repository\GroupRepository;
use App\Service\ConfigBag;
use App\Service\SecurityService;
use Doctrine\ORM\EntityManagerInterface;
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
     * @Route(name="admin_group_list", path="/group")
     */
    public function list(Request $request, GroupRepository $groupRepo, ConfigBag $bag, PaginatorInterface $paginator): Response
    {
        // Get Groups
        $query = $groupRepo->createQueryBuilder('g');

        // Get Result
        $pagination = $paginator->paginate($query,
            $request->query->getInt('page', 1),
            $bag->get('list_count')
        );

        // Render Page
        return $this->render('Admin/Account/listGroup.html.twig', [
            'groups' => $pagination,
        ]);
    }

    /**
     * Create New Group.
     *
     * @IsGranted("ROLE_GROUP_CREATE")
     * @Route(name="admin_group_create", path="/group/create")
     */
    public function create(Request $request, EntityManagerInterface $em, TranslatorInterface $translator): Response
    {
        // Create Form
        $group = new Group(null);
        $form = $this->createForm(GroupType::class, $group);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $em->persist($group);
            $em->flush();

            // Success Message
            $this->addFlash('success', 'changes_saved');

            // Redirect Edit
            return $this->redirectToRoute('admin_group_edit', ['group' => $group->getId()]);
        }

        // Render Page
        return $this->render('Admin/Account/edit.html.twig', [
            'page_title' => 'account_group_edit_title',
            'page_description' => $translator->trans('account_group_new_desc'),
            'form' => $form->createView(),
        ]);
    }

    /**
     * Edit Group.
     *
     * @IsGranted("ROLE_GROUP_EDIT")
     * @Route(name="admin_group_edit", path="/group/{group}")
     */
    public function edit(Request $request, Group $group, EntityManagerInterface $em): Response
    {
        // Create Form
        $form = $this->createForm(GroupType::class, $group);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
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
     * Edit Group Roles.
     *
     * @IsGranted("ROLE_GROUP_ROLES")
     * @Route(name="admin_group_roles", path="/group/{group}/roles")
     */
    public function roles(Group $group, Request $request, EntityManagerInterface $em, SecurityService $security): Response
    {
        // Set Form & Request
        $form = $this->createForm(RolesType::class, null, [
            'roles' => $security->getRoles(),
            'acl' => $security->getACL(),
            'userRoles' => $group->getRoles(),
        ]);

        // Valid Form
        $form->handleRequest($request);
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
     * @Route(name="admin_group_delete", path="/group/{group}/delete")
     */
    public function delete(Request $request, EntityManagerInterface $em, Group $group): RedirectResponse
    {
        // Remove
        $em->remove($group);
        $em->flush();

        // Add Flash
        $this->addFlash('success', 'changes_saved');

        // Redirect back
        return $this->redirect($request->headers->get('referer', $this->generateUrl('admin_group_list')));
    }
}
