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

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig Extension.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class FunctionExtension extends AbstractExtension
{
    /**
     * @var ParameterBagInterface
     */
    private $bag;

    /**
     * Constructor.
     */
    public function __construct(ParameterBagInterface $bag)
    {
        $this->bag = $bag;
    }

    /**
     * Create Twig Function.
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('parameters', [$this, 'parameters']),
            new TwigFunction('title', [$this, 'title']),
            new TwigFunction('inArray', [$this, 'inArray']),
            new TwigFunction('pathInfo', [$this, 'pathInfo']),
        ];
    }

    /**
     * Return Parameters.
     *
     * @param $name
     * @param int $index
     *
     * @return mixed
     */
    public function parameters($name, $index = null)
    {
        if (!$this->bag->has($name)) {
            return false;
        }

        $params = $this->bag->get($name);

        if (null === $index) {
            return $params;
        }

        if (\is_array($params)) {
            return $params[$index] ?? null;
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
    public function title($title, $parent = true)
    {
        return !$parent ? $title : str_replace(['&T', '&P'], [$title, $this->bag->get('head_title')], $this->bag->get('head_title_pattern'));
    }

    /**
     * Checks if a value exists in an array.
     *
     * @param $needle
     */
    public function inArray($needle, array $haystack): bool
    {
        return \in_array(mb_strtolower($needle), $haystack);
    }

    /**
     * Information about a file path.
     *
     * @param string $options
     */
    public function pathInfo(string $path, $options = 'extension'): string
    {
        return pathinfo($path)[mb_strtolower($options)];
    }
}
