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

/**
 * Generate DataTable Filter Inputs.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class DataTableFilters
{
    public static function text(string $field, callable $query, ?string $placeholder = null, ?string $default = null, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'text',
            'field' => $field,
            'query' => $query,
            'placeholder' => $placeholder,
            'default' => $default,
        ], $customParameters);
    }

    public static function number(string $field, callable $query, ?string $placeholder = null, ?string $default = null, array $customParameters = []): array
    {
        $customParameters['type'] = 'number';

        return self::text($field, $query, $placeholder, $default, $customParameters);
    }

    public static function email(string $field, callable $query, ?string $placeholder = null, ?string $default = null, array $customParameters = []): array
    {
        $customParameters['type'] = 'email';

        return self::text($field, $query, $placeholder, $default, $customParameters);
    }

    public static function tel(string $field, callable $query, ?string $placeholder = null, ?string $default = null, array $customParameters = []): array
    {
        $customParameters['type'] = 'tel';

        return self::text($field, $query, $placeholder, $default, $customParameters);
    }

    public static function range(string $field, callable $query, int $min = 0, int $max = 100, int $step = 1, int $default = 0, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'range',
            'field' => $field,
            'query' => $query,
            'min' => $min,
            'max' => $max,
            'step' => $step,
            'default' => $default,
        ], $customParameters);
    }

    public static function checkbox(string $field, callable $query, ?string $label = null, ?bool $default = null, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'checkbox',
            'field' => $field,
            'query' => $query,
            'label' => $label,
            'default' => $default,
        ], $customParameters);
    }

    public static function switch(string $field, callable $query, ?string $label = null, ?bool $default = null, array $customParameters = []): array
    {
        $customParameters['type'] = 'switch';

        return self::checkbox($field, $query, $label, $default, $customParameters);
    }

    public static function date(string $field, callable $query, ?string $placeholder = null, ?\DateTime $default = null, ?string $format = null, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'date',
            'field' => $field,
            'query' => $query,
            'placeholder' => $placeholder,
            'default' => $default ? $default->format(\DATE_ATOM) : null,
            'format' => $format ?? 'dd.MM.yyyy',
        ], $customParameters);
    }

    public static function dateRange(string $field, callable $query, array $placeholder = [], array $default = [], ?string $format = null, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'date_range',
            'field' => $field,
            'query' => $query,
            'placeholder' => $placeholder,
            'default' => array_map(static fn ($date) => $date->format(\DATE_ATOM), $default),
            'format' => $format ?? 'dd.MM.yyyy',
        ], $customParameters);
    }

    public static function select(string $field, callable $query, array $options, ?string $placeholder = null, ?string $default = null, array $customParameters = []): array
    {
        return array_merge([
            'type' => 'select',
            'field' => $field,
            'query' => $query,
            'placeholder' => $placeholder,
            'default' => $default,
            'options' => $options,
        ], $customParameters);
    }

    public static function selectMultiple(string $field, callable $query, array $options, ?string $placeholder = null, array $default = [], array $customParameters = []): array
    {
        return array_merge([
            'type' => 'select_multiple',
            'multiple' => true,
            'field' => $field,
            'query' => $query,
            'placeholder' => $placeholder,
            'default' => $default,
            'options' => $options,
        ], $customParameters);
    }
}
