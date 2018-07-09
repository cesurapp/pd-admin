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

namespace App\Admin\Manager;

use App\Admin\Entity\System\Config;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Application Config Save|Update.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class ConfigManager
{
    /**
     * @var ObjectManager
     */
    private $em;

    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @var array
     */
    private $realConfig = null;

    /**
     * @var Config
     */
    private $configObject = null;

    /**
     * @var string
     */
    private $configName;

    /**
     * ConfigManager constructor.
     *
     * @param ObjectManager      $em
     * @param ContainerInterface $container
     * @param $configName string
     */
    public function __construct(ObjectManager $em, ContainerInterface $container, string $configName)
    {
        $this->em = $em;
        $this->container = $container;
        $this->configName = $configName;

        // Load Configuration
        $this->configObject = $em->getRepository(Config::class)->findOneBy(['name' => $configName]);
        if (null !== $this->configObject) {
            $this->realConfig = @unserialize($this->configObject->getValue());
        }
    }

    /**
     * Get Custom Configuration.
     *
     * @param string $name
     *
     * @return array|null
     */
    public function get(string $name)
    {
        return $this->realConfig[$name] ?? null;
    }

    /**
     * Get All Configuration.
     *
     * @return array
     */
    public function getAll()
    {
        return $this->realConfig;
    }

    /**
     * Save Config Data.
     *
     * @param FormInterface $form
     */
    public function saveConfig(FormInterface $form)
    {
        // Create Config
        $config = $this->configObject ?? new Config();

        // Form Normalize
        $formData = $this->formNormalize($form);

        // Set Config Data
        $config
            ->setName($this->configName)
            ->setValue(serialize($formData));

        // Update
        $this->em->persist($config);
        $this->em->flush();
    }

    /**
     * Form Normalizer.
     *
     * @param $form
     *
     * @return mixed
     */
    private function formNormalize(FormInterface $form)
    {
        // Get Form Data
        $formData = $form->getData();

        // Normalize Form Data
        foreach ($formData as $itemName => $itemData) {
            if ($form->has($itemName)) {
                switch ($form->get($itemName)->getConfig()->getType()->getBlockPrefix()) {
                    case 'password':
                        if (null === $itemData || empty($itemData)) {
                            $formData[$itemName] = $this->realConfig[$itemName];
                        }
                        break;
                    case 'entity':
                        if (is_object($itemData)) {
                            // Get Entity Function
                            $choiceValue = $form->get($itemName)->getConfig()->getOption('choice_value');
                            $entityGetter = is_string($choiceValue) ? 'get'.ucfirst($choiceValue) : 'getId';

                            if (is_array($itemData) || $itemData instanceof ArrayCollection) {
                                $data = [];
                                foreach ($itemData as $item) {
                                    $data[] = $item->{$entityGetter}();
                                }
                                $formData[$itemName] = $data;
                            } else {
                                $formData[$itemName] = $itemData->{$entityGetter}();
                            }
                        } else {
                            $formData[$itemName] = '';
                        }
                        break;
                    case 'file':
                        if ($itemData instanceof UploadedFile || is_array($itemData)) {
                            // Delete Old File
                            $oldFile = $this->realConfig[$itemName] ?? false;
                            if (is_array($oldFile)) {
                                $fs = new Filesystem();
                                foreach ($oldFile as $file) {
                                    $file = $this->container->getParameter('upload_dir').$file;
                                    if ($fs->exists($file)) {
                                        $fs->remove($file);
                                    }
                                }
                            }

                            // Upload New File
                            $uploadManager = new UploadManager($this->container);
                            $formData[$itemName] = $uploadManager->upload($itemData, true);
                        } else {
                            $formData[$itemName] = $this->realConfig[$itemName] ?? null;
                        }
                        break;
                }
            }
        }

        return $formData;
    }
}
