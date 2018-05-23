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

use App\Admin\Entity\System\Config;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\FormInterface;

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
     * @var array
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

        $this->loadConfig($configName);
    }

    /**
     * Set Form Default Data.
     *
     * @param FormInterface $form
     */
    public function setFormData(FormInterface &$form)
    {
        foreach ($form->all() as $name => $data) {
            // Get Element Type
            $type = $form->get($name)->getConfig()->getType()->getBlockPrefix();

            switch ($type) {
                case 'entity':

                        $choice_value = (is_string($obj = $form->get($name)->getConfig()->getOption('choice_value'))) ? 'get'.ucfirst($obj) : 'get'.ucfirst($obj[0]->getIdField());
                        $choice_loader = $form->get($name)->getConfig()->getOption('choice_loader')->loadChoiceList()->getChoices();

                        foreach ($choice_loader as $choice) {
                            $value = $this->getConfig($name);
                            if ($choice->{$choice_value}() === $value) {
                                $form->get($name)->setData($choice);
                                break;
                            }
                        }

                        break;

                case 'file':

                        // Set Data
                        $form->get($name)->setData($this->getConfig($name));
                        break;

                default:

                        // Get Value
                        $value = $this->getConfig($name);

                        // Convert Bool
                        if (1 === $value || '1' === $value) {
                            $value = true;
                        } elseif (0 === $value || '0' === $value) {
                            $value = false;
                        }

                        // Set Data
                        $form->get($name)->setData($value);
                        break;
            }
        }
    }

    /**
     * Save Config Data.
     *
     * @param FormInterface $form
     *
     * @return bool
     */
    public function save(FormInterface $form)
    {
        $config = $this->configObject ? $this->configObject : new Config();

        // Form Normalize
        $formData = $this->formNormalize($form);

        // Set Data
        $config->setName($this->configName)->setValue(serialize($formData));

        // Update
        $this->em->persist($config);
        $this->em->flush();

        return true;
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
        // Normalize Data
        $normalizeData = $form->getData();

        // Normalize Entity|File Type
        foreach ($normalizeData as $itemName => $itemData) {
            // Get Item Type
            $type = $form->get($itemName)->getConfig()->getType()->getBlockPrefix();

            switch ($type) {
                // Password Type
                case 'password':

                        if (null === $itemData || empty($itemData)) {
                            $normalizeData[$itemName] = $this->realConfig[$itemName];
                        }
                        break;

                // Entity Type
                case 'entity':

                        if (count($itemData) > 0) {
                            // Get Entity Function
                            $choice_value = $form->get($itemName)->getConfig()->getOption('choice_value');
                            $entityGetter = is_string($choice_value) ? 'get'.ucfirst($choice_value) : 'getId';

                            // New Data
                            $new_data = [];

                            if (is_array($itemData) || $itemData instanceof ArrayCollection) {
                                foreach ($itemData as $item) {
                                    $new_data[] = $item->{$entityGetter}();
                                }
                                $normalizeData[$itemName] = $new_data;
                            } else {
                                $normalizeData[$itemName] = $itemData->{$entityGetter}();
                            }
                        } else {
                            $normalizeData[$itemName] = '';
                        }
                        break;

                // File Type
                case 'file':

                        if (null !== $itemData) {
                            $oldFile = (isset($this->realConfig[$itemName])) ? (($file = $this->realConfig[$itemName]) ? $file : false) : false;

                            // Delete Old File
                            if (is_array($oldFile)) {
                                $fs = new Filesystem();
                                foreach ($oldFile as $item) {
                                    $file = $this->container->getParameter('upload_dir').$item;
                                    if ($fs->exists($file)) {
                                        $fs->remove($file);
                                    }
                                }
                            }

                            $rawUpload = $form->get($itemName)->getConfig()->getOptions()['block_name'] ? true : false;

                            // Upload Manager
                            $um = new UploadManager($this->container);

                            // Upload New File
                            $normalizeData[$itemName] = $um->upload($itemData, $rawUpload);
                        } else {
                            $normalizeData[$itemName] = (isset($this->realConfig[$itemName]) && ($file = $this->realConfig[$itemName])) ? $file : null;
                        }
                        break;
            }
        }

        return $normalizeData;
    }

    /**
     * Get Config Values.
     *
     * @param $key
     * @param null $defaultReturn
     *
     * @return mixed|null
     */
    private function getConfig($key, $defaultReturn = null)
    {
        if (isset($this->realConfig[$key])) {
            return $this->realConfig[$key];
        } elseif ($this->container->hasParameter($key)) {
            return $this->container->getParameter($key);
        }

        return $defaultReturn;
    }

    /**
     * Load Configuration From Database.
     *
     * @param $configName
     */
    private function loadConfig($configName)
    {
        $this->configObject = $this->em->getRepository(Config::class)->findOneBy(['name' => $configName]);

        if (null !== $this->configObject) {
            $this->realConfig = @unserialize($this->configObject->getValue());
        }
    }
}
