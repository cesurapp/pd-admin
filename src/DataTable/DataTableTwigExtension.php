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

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Data Table Twig Extension.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class DataTableTwigExtension extends AbstractExtension
{
    private ?string $baseUrl = null;

    public function __construct(private RouterInterface $router)
    {
    }

    /**
     * Create Twig Function.
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('route', [$this, 'route']),
        ];
    }

    /**
     * Return Route Format
     */
    public function route($name, $referenceType = UrlGeneratorInterface::ABSOLUTE_URL): string
    {
        $route = $this->router->getRouteCollection()->get($name)->getPath();
        return rawurlencode($referenceType === UrlGeneratorInterface::ABSOLUTE_URL ? $this->generate() . $route : $route);
    }

    private function generate(): string
    {
        if (!$this->baseUrl) {
            $context = $this->router->getContext();
            $host = $context->getHost();
            $scheme = $context->getScheme();
            $port = '';

            if ('http' === $scheme && 80 !== $context->getHttpPort()) {
                $port = ':' . $context->getHttpPort();
            } elseif ('https' === $scheme && 443 !== $context->getHttpsPort()) {
                $port = ':' . $context->getHttpsPort();
            }

            $schemeAuthority = '' === $scheme ? '//' : "$scheme://";
            $schemeAuthority .= $host . $port;
            $this->baseUrl = $schemeAuthority . $context->getBaseUrl();
        }

        return $this->baseUrl;
    }
}
