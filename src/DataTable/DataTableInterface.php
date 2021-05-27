<?php

namespace App\DataTable;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\Request;

interface DataTableInterface
{
    public function getName(): string|int;

    public function getColumns(): array;

    public function getColumnsJson(): string;

    public function handleQueryBuilder(QueryBuilder $queryBuilder): self;

    public function handleRequest(Request $request): self;

    public function exportExcel(): void;

    public function exportCsv(): void;
}
