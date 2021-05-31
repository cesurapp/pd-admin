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

use App\Service\ConfigBag;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig Extension.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class FunctionExtension extends AbstractExtension
{
    public function __construct(
        private ConfigBag $bag,
        private TranslatorInterface $translator)
    {
    }

    /**
     * Create Twig Function.
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('title', [$this, 'title']),
            new TwigFunction('inArray', [$this, 'inArray']),
            new TwigFunction('pathInfo', [$this, 'pathInfo']),
            new TwigFunction('basename', [$this, 'basename']),
            new TwigFunction('flashJsonMessage', [$this, 'flashJsonMessage']),
        ];
    }

    /**
     * Return Panel Title.
     */
    public function title($title, $parent = true): string
    {
        return !$parent ? $title : str_replace(['&T', '&P'], [$title, $this->bag->get('head_title')], $this->bag->get('head_title_pattern'));
    }

    /**
     * Checks if a value exists in an array.
     */
    public function inArray($needle, array $haystack): bool
    {
        return \in_array($needle, $haystack, false);
    }

    /**
     * Information about a file path.
     */
    public function pathInfo(string $path, $options = 'extension'): string
    {
        return pathinfo($path)[mb_strtolower($options)];
    }

    /**
     * Basename Formatter.
     */
    public function basename($path): string
    {
        return basename($path);
    }

    /**
     * Flash Message to JSON Format and Translated.
     */
    public function flashJsonMessage(array $messages): string
    {
        $translated = [];

        foreach ($messages as $type => $items) {
            $translated[$type] = array_map(fn ($message) => $this->translator->trans($message), $items);
        }

        return json_encode($translated);
    }
}
