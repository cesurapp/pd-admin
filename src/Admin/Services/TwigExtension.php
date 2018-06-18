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

namespace App\Admin\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Twig Extension.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class TwigExtension extends \Twig_Extension
{
    /**
     * Translator.
     *
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * Container.
     *
     * @var ContainerInterface
     */
    private $container;

    /**
     * Constructor.
     *
     * @param TranslatorInterface $translator
     * @param ContainerInterface  $container
     */
    public function __construct(TranslatorInterface $translator, ContainerInterface $container)
    {
        $this->translator = $translator;
        $this->container = $container;
    }

    /**
     * Create Twig Filter.
     *
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('timeDiff', [$this, 'timeDiffFilter'], ['needs_environment' => true]),
            new \Twig_SimpleFilter('phoneFormat', [$this, 'phoneFormatFilter']),
            new \Twig_SimpleFilter('basename', [$this, 'baseNameFilter']),
            new \Twig_SimpleFilter('swiftEvent', [$this, 'swiftEventFilter']),
        ];
    }

    /**
     * Create Twig Function.
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('parameters', [$this, 'parametersFunction']),
            new \Twig_SimpleFunction('title', [$this, 'titleFunction']),
        ];
    }

    /**
     * Time Ago.
     *
     * @param \Twig_Environment $env
     * @param $date
     * @param null $now
     * @param int  $length
     *
     * @return string
     */
    public function timeDiffFilter(\Twig_Environment $env, $date, $now = null, $length = 1)
    {
        $units = [
            'y' => $this->translator->trans('diff.year'),
            'm' => $this->translator->trans('diff.month'),
            'd' => $this->translator->trans('diff.day'),
            'h' => $this->translator->trans('diff.hour'),
            'i' => $this->translator->trans('diff.minute'),
            's' => $this->translator->trans('diff.second'),
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

        return ($format) ? $format.$this->translator->trans('diff.ago') : '';
    }

    /**
     * Phone Formatter.
     *
     * @param $phone
     *
     * @return string
     */
    public function phoneFormatFilter($phone)
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
    public function baseNameFilter($path)
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
    public function swiftEventFilter($event, $color = false)
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

    /**
     * Return Parameters.
     *
     * @param $name
     * @param int $index
     *
     * @return mixed
     */
    public function parametersFunction($name, $index = 0)
    {
        $params = $this->container->getParameter($name);

        if ('false' === $index) {
            return $params;
        }

        if (is_array($params)) {
            return $params[$index];
        }

        return $params;
    }

    /**
     * Return Panel Title.
     *
     * @param $title
     * @param bool $parent
     *
     * @return mixed
     */
    public function titleFunction($title, $parent = true)
    {
        if (!$parent) {
            return $title;
        }

        $getTitle = str_replace('%T', $title, $this->container->getParameter('head_title_pattern'));
        $getTitle = str_replace('%P', $this->container->getParameter('head_title'), $getTitle);

        return $getTitle;
    }
}
