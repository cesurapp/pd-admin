<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Kerem APAYDIN <kerem@apaydin.me>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Twig;

use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Twig Extension.
 *
 * @author Kerem APAYDIN <kerem@apaydin.me>
 */
class FilterExtension extends AbstractExtension
{
    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * FilterExtension constructor.
     *
     * @param TranslatorInterface $translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Create Twig Filter.
     */
    public function getFilters()
    {
        return [
            new TwigFilter('timeDiff', [$this, 'timeDiff'], ['needs_environment' => true]),
            new TwigFilter('phoneFormat', [$this, 'phoneFormat']),
            new TwigFilter('basename', [$this, 'baseName']),
            new TwigFilter('swiftEvent', [$this, 'swiftEvent']),
        ];
    }

    /**
     * Time Ago.
     *
     * @param Environment $env
     * @param $date
     * @param null   $now
     * @param string $text
     * @param int    $length
     * @param string $domain
     *
     * @return string
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
     *
     * @return string
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
     *
     * @return string
     */
    public function baseName($path): string
    {
        return basename($path);
    }

    /**
     * SwiftMailer Event Convert.
     *
     * @param $event
     * @param bool $color
     *
     * @return string
     */
    public function swiftEvent($event, $color = false): string
    {
        $str = '';

        switch ($event) {
            case \Swift_Events_SendEvent::RESULT_SUCCESS:
                $str = $color ? 'success' : $this->translator->trans('RESULT_SUCCESS');
                break;
            case \Swift_Events_SendEvent::RESULT_FAILED:
                $str = $color ? 'danger' : $this->translator->trans('RESULT_FAILED');
                break;
            case \Swift_Events_SendEvent::RESULT_SPOOLED:
                $str = $color ? 'primary' : $this->translator->trans('RESULT_SPOOLED');
                break;
            case \Swift_Events_SendEvent::RESULT_PENDING:
                $str = $color ? 'warning' : $this->translator->trans('RESULT_PENDING');
                break;
            case \Swift_Events_SendEvent::RESULT_TENTATIVE:
                $str = $color ? 'info' : $this->translator->trans('RESULT_TENTATIVE');
                break;
            case -1:
                $str = $color ? 'secondary' : $this->translator->trans('RESULT_DELETED');
                break;
        }

        return $str;
    }
}
