<?php

namespace App\Controller\Admin;

use App\Service\ConfigBag;
use App\Tables\ActivityLogHttpTable;
use App\Tables\ActivityLogMailTable;
use Knp\Component\Pager\PaginatorInterface;
use Pd\ActivityBundle\Repository\ActivityLogRepository;
use Pd\ActivityBundle\Repository\MailLogRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Activity Log Viewer
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class ActivityLogController extends AbstractController
{
    public function __construct(private PaginatorInterface $paginator, private ConfigBag $bag)
    {
    }

    /**
     * View HTTP Logs
     *
     * @IsGranted("ROLE_ACTIVITY_HTTP")
     */
    #[Route('/activity-log/http', name: 'admin.activity_log.http', methods: ['GET'])]
    public function httpLog(Request $request, ActivityLogRepository $repo, ActivityLogHttpTable $table): Response
    {
        $table
            ->handleQueryBuilder($query = $repo->createQueryBuilder('q'))
            ->handleRequest($request);

        // Paginate
        $pagination = $this->paginator->paginate($query->getQuery(),
            $request->query->getInt('page', 1),
            $this->bag->get('list_count')
        );

        return $request->isXmlHttpRequest() ?
            $this->json($pagination, context: ['groups' => 'default']) :
            $this->render('admin/config/activityLogHttp.html.twig', ['table' => $table]);
    }

    /**
     * View Mail Logs
     *
     * @IsGranted("ROLE_ACTIVITY_MAIL")
     */
    #[Route('/activity-log/mail', name: 'admin.activity_log.mail', methods: ['GET'])]
    public function mailLog(Request $request, MailLogRepository $repo, ActivityLogMailTable $table): Response
    {
        $table
            ->handleQueryBuilder($query = $repo->createQueryBuilder('q'))
            ->handleRequest($request);

        // Paginate
        $pagination = $this->paginator->paginate($query->getQuery(),
            $request->query->getInt('page', 1),
            $this->bag->get('list_count')
        );

        return $request->isXmlHttpRequest() ?
            $this->json($pagination, context: ['groups' => 'default']) :
            $this->render('admin/config/activityLogMail.html.twig', ['table' => $table]);
    }
}
