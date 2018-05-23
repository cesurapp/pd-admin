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

namespace App\Admin\Services;

use Symfony\Component\Config\Definition\Exception\Exception;

/**
 * Tools.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class Utils
{
    /**
     * Sanitize Text.
     *
     * @param $string
     * @param array  $replace
     * @param string $delimiter
     *
     * @return mixed|string
     */
    public function slug($string, $replace = [], $delimiter = '-')
    {
        // Load Iconv
        if (!extension_loaded('iconv')) {
            throw new Exception('iconv module not loaded');
        }

        // Save the old locale and set the new locale to UTF-8
        $oldLocale = setlocale(LC_ALL, '0');
        setlocale(LC_ALL, 'en_US.UTF-8');
        $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $string);
        if (!empty($replace)) {
            $clean = str_replace((array) $replace, ' ', $clean);
        }
        $clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
        $clean = mb_strtolower($clean);
        $clean = preg_replace("/[\/_|+ -]+/", $delimiter, $clean);
        $clean = trim($clean, $delimiter);
        // Revert back to the old locale
        setlocale(LC_ALL, $oldLocale);

        return $clean;
    }

    /**
     * Array Key => Value Implode.
     *
     * @param array  $array
     * @param string $glue
     *
     * @return array
     */
    public function implodeKeyValue(array $array, $glue = ' - ')
    {
        $imloded = [];

        // Imlode Key => Value
        foreach ($array as $key => $value) {
            $imloded[] = "{$key}{$glue}{$value}";
        }

        return $imloded;
    }
}
