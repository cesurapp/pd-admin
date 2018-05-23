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

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;

/**
 * Reload Symfony Container.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class ReloadContainer
{
    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Reload Symfony Container.
     *
     * @return bool
     */
    public function reloadContainer()
    {
        // Find Container Files
        $cache = $this->container->getParameter('kernel.cache_dir');
        $files = glob("{{$cache}/Container*,{$cache}/*ProjectContainer.php}", GLOB_BRACE);

        if (count($files)) {
            // Get Filesystem
            $fs = new Filesystem();

            // Remove Files
            foreach ($files as $file) {
                $fs->remove($file);
            }

            return true;
        }

        return false;
    }
}
