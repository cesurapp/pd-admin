<?php

namespace App\DataTable;

class DataTableMessage implements DataTableMessageInterface
{
    public function __construct(
        private string $dql,
        private array $parameters,
        private array $columns,
        private bool $arrayResult = false
    )
    {
    }

    public function getDql(): string
    {
        return $this->dql;
    }

    public function getParameters(): array
    {
        return $this->parameters;
    }

    public function getColumns(): array
    {
        return $this->columns;
    }

    public function isArrayResult(): bool
    {
        return $this->arrayResult;
    }
}
