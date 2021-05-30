<?php

namespace App\DataTable;

use App\DataTable\Exporter\PaginatedORMQuerySource;
use Doctrine\ORM\QueryBuilder;
use Sonata\Exporter\Writer\CsvWriter;
use Sonata\Exporter\Writer\XlsWriter;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

/**
 * Ajax Data Table
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
abstract class AbstractDataTable implements DataTableInterface
{
    protected array $columns = [];
    private ?QueryBuilder $queryBuilder;
    private ?Request $request;

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
            foreach ($this->initColumns() as $field => $column) {
                // Check Role
                if (isset($column['roles'])) {
                    if (!$this->auth->isGranted($column['roles'])) {
                        continue;
                    }

                    unset($column['roles']);
                }

                $this->columns[$field] = $column;
            }
        }

        return $this->columns;
    }

    /**
     * Get Columns List for JSON
     */
    final public function getColumnsJson(): string
    {
        return json_encode(array_values($this->getColumns()));
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
        $this->request = $request;

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

    /**
     * Export Data to CSV - Excel
     */
    final public function export(): StreamedResponse
    {
        // Disable Sql Logger
        $this->queryBuilder->getEntityManager()->getConfiguration()->setSQLLogger();

        // Source && Writer
        $source = new PaginatedORMQuerySource($this->queryBuilder->getQuery(), $this->exportColumns(), $this->getColumns());
        $writer = match ($this->request->get('export')) {
            'excel' => new XlsWriter('php://output'),
            default => new CsvWriter('php://output')
        };

        $response = new StreamedResponse(static function () use ($source, $writer) {
            $writer->open();
            foreach ($source as $data) {
                $writer->write($data);
            }
            $writer->close();
        });

        // Set File Header
        $response->headers->set('Content-Type', $writer->getDefaultMimeType());
        $response->headers->set('Content-Disposition', HeaderUtils::makeDisposition(HeaderUtils::DISPOSITION_ATTACHMENT, 'export.' . $writer->getFormat()));

        return $response;
    }

    private function exportColumns(): array
    {
        if ($columns = $this->request->get('columns')) {
            $columns = explode(',', $columns);

            if (is_array($columns) && count($columns)) {
                return $columns;
            }
        }

        return ['id'];
    }

    abstract protected function initColumns(): array;
}
