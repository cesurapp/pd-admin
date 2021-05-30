<?php


namespace App\DataTable\Exporter;

use Doctrine\ORM\Query;
use Sonata\Exporter\Source\AbstractPropertySourceIterator;
use Symfony\Component\PropertyAccess\Exception\UnexpectedTypeException;
use Symfony\Component\PropertyAccess\PropertyPath;

/**
 * Doctrine ORM Paginator Source
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class PaginatedORMQuerySource extends AbstractPropertySourceIterator
{
    protected Query $query;

    private const PAGE_SIZE = 1000;

    private int $page = 0;

    private array $columns;

    public function __construct(Query $query, array $fields, array $columns, string $dateTimeFormat = 'r',)
    {
        $this->query = clone $query;
        $this->query->setParameters($query->getParameters());
        foreach ($query->getHints() as $name => $value) {
            $this->query->setHint($name, $value);
        }

        $this->columns = $columns;
        $this->query->setMaxResults(self::PAGE_SIZE);
        $this->query->setFirstResult(0);

        parent::__construct($fields, $dateTimeFormat);
    }

    public function current()
    {
        $current = $this->iterator->current();

        $data = $this->getCurrentData($current[0]);

        $this->query->getEntityManager()->clear();

        return $data;
    }

    final public function rewind(): void
    {
        $this->iterator = $this->query->iterate();
        $this->iterator->rewind();
    }

    public function next(): void
    {
        $this->iterator->next();

        if (!$this->iterator->valid()) {
            $this->page++;
            $this->query->setFirstResult($this->page * self::PAGE_SIZE);
            $this->query->getEntityManager()->clear();

            $this->iterator = null;
            $this->rewind();
        }
    }

    protected function getCurrentData($current): array
    {
        $data = [];
        foreach ($this->fields as $key => $field) {
            if (\is_string($field)) {
                $name = \is_string($key) ? $key : $field;
                $propertyPath = $field;
            } else {
                throw new \TypeError('Unsupported field type. Field should be a string.');
            }

            try {
                $propertyValue = $this->propertyAccessor->getValue($current, new PropertyPath($propertyPath));

                if (isset($this->columns[$name]['export_template'])) {
                    $data[$name] = $this->columns[$name]['export_template']($propertyValue);
                } else {
                    $data[$name] = $this->getValue($propertyValue);
                }
            } catch (UnexpectedTypeException $e) {
                // Non existent object in path will be ignored but a wrong path will still throw exceptions
                $data[$name] = null;
            }
        }

        return $data;
    }
}
