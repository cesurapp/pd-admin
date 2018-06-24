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
 * @link        https://github.com/rmznpydn/pd-admin
 */

namespace App\Admin\Library;

/**
 * Tools.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class Tools
{
    /**
     * Converts UTF-8 string to ASCII.
     * @author  David Grudl (https://davidgrudl.com)
     *
     * @param string $s
     * @return string
     */
    public function toAscii(string $s): string
    {
        static $transliterator = null;
        if ($transliterator === null && class_exists('Transliterator', false)) {
            $transliterator = \Transliterator::create('Any-Latin; Latin-ASCII');
        }
        $s = preg_replace('#[^\x09\x0A\x0D\x20-\x7E\xA0-\x{2FF}\x{370}-\x{10FFFF}]#u', '', $s);
        $s = strtr($s, '`\'"^~?', "\x01\x02\x03\x04\x05\x06");
        $s = str_replace(
            ["\u{201E}", "\u{201C}", "\u{201D}", "\u{201A}", "\u{2018}", "\u{2019}", "\u{B0}"],
            ["\x03", "\x03", "\x03", "\x02", "\x02", "\x02", "\x04"], $s
        );
        if ($transliterator !== null) {
            $s = $transliterator->transliterate($s);
        }
        if (ICONV_IMPL === 'glibc') {
            $s = str_replace(
                ["\u{BB}", "\u{AB}", "\u{2026}", "\u{2122}", "\u{A9}", "\u{AE}"],
                ['>>', '<<', '...', 'TM', '(c)', '(R)'], $s
            );
            $s = iconv('UTF-8', 'WINDOWS-1250//TRANSLIT//IGNORE', $s);
            $s = strtr($s, "\xa5\xa3\xbc\x8c\xa7\x8a\xaa\x8d\x8f\x8e\xaf\xb9\xb3\xbe\x9c\x9a\xba\x9d\x9f\x9e"
                . "\xbf\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0\xd1\xd2\xd3"
                . "\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8"
                . "\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf8\xf9\xfa\xfb\xfc\xfd\xfe"
                . "\x96\xa0\x8b\x97\x9b\xa6\xad\xb7",
                'ALLSSSSTZZZallssstzzzRAAAALCCCEEEEIIDDNNOOOOxRUUUUYTsraaaalccceeeeiiddnnooooruuuuyt- <->|-.');
            $s = preg_replace('#[^\x00-\x7F]++#', '', $s);
        } else {
            $s = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s);
        }
        $s = str_replace(['`', "'", '"', '^', '~', '?'], '', $s);
        return strtr($s, "\x01\x02\x03\x04\x05\x06", '`\'"^~?');
    }

    /**
     * Converts UTF-8 string to web safe characters [a-z0-9-] text
     * @author  David Grudl (https://davidgrudl.com)
     *
     * @param string $s
     * @param string|null $charlist
     * @param bool $lower
     * @return string
     */
    public function webalize(string $s, string $charlist = null, bool $lower = true): string
    {
        $s = $this->toAscii($s);
        if ($lower) {
            $s = strtolower($s);
        }
        $s = preg_replace('#[^a-z0-9' . ($charlist !== null ? preg_quote($charlist, '#') : '') . ']+#i', '-', $s);
        $s = trim($s, '-');
        return $s;
    }

    /**
     * Generate random string.
     *
     * @param int $length
     * @param string $charlist
     * @return string
     */
    public function randomStr(int $length = 10, string $charlist = '0-9a-z'): string
    {
        $charlist = count_chars(preg_replace_callback('#.-.#', function (array $m) {
            return implode('', range($m[0][0], $m[0][2]));
        }, $charlist), 3);
        $chLen = strlen($charlist);
        if ($length < 1) {
            $length = 10;
        }
        $res = '';
        for ($i = 0; $i < $length; $i++) {
            $res .= $charlist[random_int(0, $chLen - 1)];
        }
        return $res;
    }

    /**
     * Array Key => Value Implode.
     *
     * @param array $array
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
