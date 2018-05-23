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
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Admin\Repository;

use Doctrine\ORM\EntityRepository;

class MailTemplateRepository extends EntityRepository
{
    public function findTemplate(string $contentID, int $status, array $language)
    {
        $dql = "SELECT m from Admin:System\MailTemplate m WHERE (m.contentId = :cid) and (m.status = :status) ORDER BY FIELD(m.language, :lang) DESC";
        $query = $this
            ->getEntityManager()
            ->createQuery($dql)
            ->setParameters([
                'cid' => $contentID,
                'status' => $status,
                'lang' => $language,
            ]);

        return $query->execute();
    }
}
