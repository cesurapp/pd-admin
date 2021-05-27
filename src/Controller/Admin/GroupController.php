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
use App\Form\Account\RolesType;
use App\Repository\Account\GroupRepository;
use App\Service\ConfigBag;
use App\Service\SecurityService;
use App\Tables\GroupListTable;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Pd\UserBundle\Form\GroupType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller managing the groups.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class GroupController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    /**
     * List Groups.
     *
     * @IsGranted("ROLE_GROUP_LIST")
     */
    #[Route('/group', name: 'admin.group_list')]
    public function list(Request $request, GroupRepository $groupRepo, GroupListTable $table, ConfigBag $bag, PaginatorInterface $paginator): Response
    {
        $table
            ->handleQueryBuilder($query = $groupRepo->createQueryBuilder('q'))
            ->handleRequest($request);

        // Get Result
        $data = $paginator->paginate($query,
            $request->query->getInt('page', 1),
            $bag->get('list_count')
        );

        // Render Page
        return $request->isXmlHttpRequest() ? $this->json($data) : $this->render('Admin/Account/listGroup.html.twig', [
            'table' => $table
        ]);
    }

    /**
     * Create New Group.
     *
     * @IsGranted("ROLE_GROUP_CREATE")
     */
    #[Route('/group/create', name: 'admin.group_create')]
    public function create(Request $request, Group $group = null): Response
    {
        // Create Form
        $group ??= new Group(null);
        $form = $this->createForm(GroupType::class, $group);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->em->persist($group);
            $this->em->flush();

            return $this->json($group);
        }

        // Render Page
        return $this
            ->render('admin/account/groupEdit.html.twig', ['form' => $form->createView()])
            ->setStatusCode($form->isSubmitted() && !$form->isValid() ? 403 : 200);
    }

    /**
     * Edit Group.
     *
     * @IsGranted("ROLE_GROUP_EDIT")
     */
    #[Route('/group/{group}/edit', name: 'admin.group_edit')]
    public function edit(Request $request, Group $group): Response
    {
        return $this->create($request, $group);
    }

    /**
     * Edit Group Roles.
     *
     * @IsGranted("ROLE_GROUP_ROLES")
     */
    #[Route('/group/{group}/roles', name: 'admin.group_roles')]
    public function roles(Group $group, Request $request, SecurityService $security): Response
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
                $roles = array_merge($roles, $form->get('aclProcess')->getData());
            }
            if ($roles) {
                $group->setRoles($roles);
            }

            // Save
            $this->em->persist($group);
            $this->em->flush();

            return $this->json($group);
        }

        // Render Page
        return $this
            ->render('admin/account/groupEdit.html.twig', ['form' => $form->createView()])
            ->setStatusCode($form->isSubmitted() && !$form->isValid() ? 403 : 200);
    }

    /**
     * Delete Group.
     *
     * @IsGranted("ROLE_GROUP_DELETE")
     */
    #[Route('/group/{group}/delete', name: 'admin.group_delete', methods: ['DELETE'])]
    public function delete(Group $group): JsonResponse
    {
        // Remove
        $this->em->remove($group);
        $this->em->flush();

        return $this->json(['status' => true]);
    }
}
