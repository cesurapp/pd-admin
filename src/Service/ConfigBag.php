<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Service;

use App\Entity\System\Config;
use App\Repository\System\ConfigRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\FormInterface;

/**
 * Get Config for DB.
 *
 * @author Ramazan APAYDIN <apaydin@gmail.com>
 */
class ConfigBag
{
    private array $configs = [];

    public function __construct(
        private ConfigRepository $configRepo,
        private ParameterBagInterface $bag,
        private EntityManagerInterface $entityManager
    )
    {
    }

    /**
     * Get Config to Store.
     */
    public function get(string $name): mixed
    {
        $this->loadConfigRepository();

        // Load DB
        if (!empty($this->configs[$name])) {
            return $this->configs[$name];
        }

        // Load Symfony Parameters
        if ($this->bag->has($name)) {
            return $this->bag->get($name);
        }

        return null;
    }

    /**
     * Get All Configuration.
     */
    public function getAll(): array
    {
        $this->loadConfigRepository();
        return $this->configs;
    }

    /**
     * Set Config to Store.
     */
    public function set(string $name, $value = null): self
    {
        $this->loadConfigRepository();

        $this->configs[$name] = $value;

        return $this;
    }

    /**
     * Set Config to Array.
     */
    public function setAll(array $configs): self
    {
        if ($configs) {
            foreach ($configs as $name => $value) {
                $this->set($name, $value);
            }
        }

        return $this;
    }

    /**
     * Load All Config for CACHE|Repository.
     */
    private function loadConfigRepository(): void
    {
        // Check Config
        if (count($this->configs) > 0) {
            return;
        }

        // Load Cache|Repository
        foreach ($this->configRepo->findAll() as $config) {
            $this->configs[$config->getName()] = $config->getConvertedValue();
        }
    }

    /**
     * Save Config to DB.
     */
    public function saveForm(FormInterface $form): void
    {
        foreach ($this->formNormalize($form) as $config) {
            if ($persist = $this->configRepo->findOneBy(['name' => $config->getName()])) {
                $this->entityManager->persist($persist
                    ->setValue($config->getValue())
                    ->setType($config->getType())
                );
                continue;
            }

            $this->entityManager->persist($config);
        }

        // Save
        $this->entityManager->flush();
    }

    /**
     * Form Data Normalize.
     *
     * @return Config[]
     */
    private function formNormalize(FormInterface $form): ?array
    {
        // Get Form Data
        $configItems = [];

        // Normalize Form Data
        foreach ($form->all() as $itemName => $item) {
            switch ($item->getConfig()->getType()->getBlockPrefix()) {
                case 'checkbox':
                    $configItems[] = (new Config())
                        ->setType('boolean')
                        ->setName($itemName)
                        ->setValue($item->getData());
                    break;
                case 'range':
                    $configItems[] = (new Config())
                        ->setType('number')
                        ->setName($itemName)
                        ->setValue($item->getData());
                    break;
                case 'entity':
                    $data = [];
                    if (\is_object($item->getData())) {
                        $choiceValue = $form->get($itemName)->getConfig()->getOption('choice_value');
                        $entityGetter = is_string($choiceValue) ? 'get' . ucfirst($choiceValue) : 'getId';
                        if (is_array($item->getData()) || $item->getData() instanceof ArrayCollection) {
                            foreach ($item->getData() as $itemData) {
                                $data[] = $itemData->{$entityGetter}();
                            }
                        } else {
                            $data = $item->getData()->{$entityGetter}();
                        }
                    } else {
                        $data = '';
                    }

                    $configItems[] = (new Config())
                        ->setType('json')
                        ->setName($itemName)
                        ->setValue(json_encode($data));
                    break;
                case 'file':
                    /*if ($itemData instanceof UploadedFile || \is_array($itemData)) {
                        // Delete Old File
                        FileUpload::removeFiles($this->configs[$itemName]);

                        // Upload New File
                        $uploadManager = new FileUpload($this);
                        $formData[$itemName] = $uploadManager->upload($itemData, true);
                    } else {
                        $formData[$itemName] = $this->configs[$itemName] ?? null;
                    }*/
                    break;
                default:
                    $configItems[] = (new Config())
                        ->setType('string')
                        ->setName($itemName)
                        ->setValue($item->getData());
                    break;
            }
        }

        return $configItems;
    }
}
