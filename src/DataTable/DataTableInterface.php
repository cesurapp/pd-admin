<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\DataTable;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

interface DataTableInterface
{
    public function getName(): string | int;

    public function getColumns(): array;

    public function getColumnsJson(): string;

    public function handleQueryBuilder(QueryBuilder $queryBuilder): self;

    public function handleRequest(Request $request): self;

    public function export(): StreamedResponse;
}
