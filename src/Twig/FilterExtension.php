<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Twig;

use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Twig Custom Filters.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class FilterExtension extends AbstractExtension
{
    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function getFilters()
    {
        return [
            new TwigFilter('timeDiff', [$this, 'timeDiff'], ['needs_environment' => true]),
            new TwigFilter('phoneFormat', [$this, 'phoneFormat']),
            new TwigFilter('basename', [$this, 'basename']),
        ];
    }

    /**
     * Time Ago.
     *
     * @param $date
     * @param null   $now
     * @param string $text
     * @param string $domain
     * @param int    $length
     */
    public function timeDiff(Environment $env, $date, $now = null, $text = 'diff.ago', $domain = 'messages', $length = 1): string
    {
        $units = [
            'y' => $this->translator->trans('diff.year', [], $domain),
            'm' => $this->translator->trans('diff.month', [], $domain),
            'd' => $this->translator->trans('diff.day', [], $domain),
            'h' => $this->translator->trans('diff.hour', [], $domain),
            'i' => $this->translator->trans('diff.minute', [], $domain),
            's' => $this->translator->trans('diff.second', [], $domain),
        ];

        // Date Time
        $date = twig_date_converter($env, $date);
        $now = twig_date_converter($env, $now);

        // Convert
        $diff = $date->diff($now);
        $format = '';

        $counter = 0;
        foreach ($units as $key => $val) {
            $count = $diff->$key;

            if (0 !== $count) {
                $format .= $count.' '.$val.' ';

                ++$counter;
                if ($counter === $length) {
                    break;
                }
            }
        }

        return $format ? $format.$this->translator->trans($text, [], $domain) : '';
    }

    /**
     * Phone Formatter.
     *
     * @param $phone
     */
    public function phoneFormat($phone): string
    {
        // Null | Empty | 0
        if (empty($phone) || 0 === $phone) {
            return '';
        }

        return mb_substr($phone, 0, 3).'-'.mb_substr($phone, 3, 3).'-'.mb_substr($phone, 6);
    }

    /**
     * Basename Formatter.
     *
     * @param $path
     */
    public function basename($path): string
    {
        return basename($path);
    }
}
