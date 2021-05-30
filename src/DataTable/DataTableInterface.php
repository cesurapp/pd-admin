<?php

namespace App\DataTable;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

interface DataTableInterface
{
    public function getName(): string|int;

    public function getColumns(): array;

    public function getColumnsJson(): string;

    public function handleQueryBuilder(QueryBuilder $queryBuilder): self;

    public function handleRequest(Request $request): self;

    public function export(): StreamedResponse;
}
