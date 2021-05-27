<?php

namespace App\DataTable;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

abstract class AbstractDataTable implements DataTableInterface
{
    protected array $columns = [];
    private ?QueryBuilder $queryBuilder;

    public function __construct(protected AuthorizationCheckerInterface $auth,
                                protected MessageBusInterface $bus)
    {
    }

    /**
     * Get Table Name
     */
    public function getName(): string|int
    {
        return (new \ReflectionClass($this))->getShortName();
    }

    /**
     * Get Column List
     */
    final public function getColumns(): array
    {
        if (!$this->columns) {
            foreach ($this->initColumns() as $column) {
                // Check Role
                if (isset($column['roles'])) {
                    if (!$this->auth->isGranted($column['roles'])) {
                        continue;
                    }

                    unset($column['roles']);
                }

                $this->columns[] = $column;
            }
        }

        return $this->columns;
    }

    /**
     * Get Columns List for JSON
     */
    final public function getColumnsJson(): string
    {
        return json_encode($this->getColumns());
    }

    /**
     * Init Query Builder
     */
    final public function handleQueryBuilder(QueryBuilder $queryBuilder): self
    {
        $this->queryBuilder = $queryBuilder;

        return $this;
    }

    /**
     * Generate Query using ORM|DBAL Query Builder
     */
    final public function handleRequest(Request $request): self
    {
        foreach ($this->getColumns() as $column) {
            if (!isset($column['filters'])) {
                continue;
            }

            $data = array_merge($request->query->all(), $request->request->all());

            foreach ($column['filters'] as $filter) {
                if (isset($data[$filter['field']])) {
                    $filter['query']($this->queryBuilder, $data);
                }
            }
        }

        return $this;
    }

    final public function exportExcel(): void
    {
        $this->bus->dispatch(new DataTableMessage(
            $this->queryBuilder->getDQL(),
            $this->queryBuilder->getParameters()->toArray(),
            $this->getColumns()
        ));
    }

    final public function exportCsv(): void
    {
    }

    abstract protected function initColumns(): array;
}
