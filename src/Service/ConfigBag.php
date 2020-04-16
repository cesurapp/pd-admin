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

use App\Entity\Config;
use App\Repository\ConfigRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Get Config for DB.
 *
 * @author Ramazan APAYDIN <apaydin@gmail.com>
 */
class ConfigBag
{
    /**
     * @var ConfigRepository
     */
    private $configRepo;
    /**
     * @var ParameterBagInterface
     */
    private $bag;
    /**
     * @var array
     */
    private $configs = [];

    public function __construct(ConfigRepository $configRepo, ParameterBagInterface $bag)
    {
        $this->configRepo = $configRepo;
        $this->bag = $bag;
    }

    /**
     * Get Config to Store.
     *
     * @return mixed|null
     */
    public function get(string $name)
    {
        // Load
        $this->loadConfigRepository();

        // Load DB
        if (isset($this->configs[$name]) && '' !== $this->configs[$name]) {
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
        // Load
        $this->loadConfigRepository();

        return $this->configs;
    }

    /**
     * Set Config to Store.
     *
     * @param null $value
     *
     * @return ConfigBag
     */
    public function set(string $name, $value = null): self
    {
        // Load
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
        if (\count($this->configs) > 0) {
            return;
        }

        // Load Cache|Repository
        $store = $this->configRepo->findAll();
        foreach ($store as $config) {
            if (count($config->getValue()) === 1) {
                $val = $config->getValue()[0];

                if ('true' === $val) {
                    $val = true;
                } elseif ('false' === $val) {
                    $val = false;
                }
            } else {
                $val = $config->getValue();
            }

            $this->configs[$config->getName()] = $val;
        }
    }

    /**
     * Save Config to DB.
     *
     * @param array|FormInterface $configs
     */
    public function saveToDB(ObjectManager $em, $configs): void
    {
        // Normalize Form
        if ($configs instanceof FormInterface) {
            $configs = $this->formNormalize($configs);
        }

        $data = $this->configRepo->createQueryBuilder('c')
            ->where('c.name IN (:names)')
            ->setParameter('names', array_keys($configs))
            ->getQuery()
            ->getResult();

        // Update
        foreach ($data as $item) {
            if (\array_key_exists($item->getName(), $configs)) {
                $item->setValue($configs[$item->getName()]);
                $em->persist($item);

                unset($configs[$item->getName()]);
            }
        }

        // Create New
        foreach ($configs as $name => $value) {
            $config = (new Config())->setName($name)->setValue($value);
            $em->persist($config);
        }

        // Save
        $em->flush();
    }

    /**
     * Form Data Normalize.
     */
    private function formNormalize(FormInterface $form): ?array
    {
        // Get Form Data
        $formData = $form->getData();

        // Normalize Form Data
        foreach ($formData as $itemName => $itemData) {
            if ($form->has($itemName)) {
                switch ($form->get($itemName)->getConfig()->getType()->getBlockPrefix()) {
                    case 'password':
                        if (null === $itemData || empty($itemData)) {
                            $formData[$itemName] = $this->configs[$itemName] ?? null;
                        }
                        break;
                    case 'entity':
                        if (\is_object($itemData)) {
                            // Get Entity Function
                            $choiceValue = $form->get($itemName)->getConfig()->getOption('choice_value');
                            $entityGetter = \is_string($choiceValue) ? 'get' . ucfirst($choiceValue) : 'getId';

                            if (\is_array($itemData) || $itemData instanceof ArrayCollection) {
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
                        if ($itemData instanceof UploadedFile || \is_array($itemData)) {
                            // Delete Old File
                            FileUpload::removeFiles($this->configs[$itemName]);

                            // Upload New File
                            $uploadManager = new FileUpload($this);
                            $formData[$itemName] = $uploadManager->upload($itemData, true);
                        } else {
                            $formData[$itemName] = $this->configs[$itemName] ?? null;
                        }
                        break;
                    case 'checkbox':
                        $formData[$itemName] = $itemData ? 'true' : 'false';
                        break;
                }
            }
        }

        return $formData;
    }
}
