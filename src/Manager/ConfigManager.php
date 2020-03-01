<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Manager;

use App\Entity\Config;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Application Config Save|Update.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class ConfigManager
{
    /**
     * @var ObjectManager
     */
    private $em;

    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;

    /**
     * @var array
     */
    private $realConfig;

    /**
     * @var Config
     */
    private $configObject;

    /**
     * @var string
     */
    private $configName;

    /**
     * ConfigManager constructor.
     *
     * @param $configName string
     */
    public function __construct(ObjectManager $em, ParameterBagInterface $parameterBag, string $configName)
    {
        $this->em = $em;
        $this->parameterBag = $parameterBag;
        $this->configName = $configName;

        // Load Configuration
        $this->configObject = $em->getRepository(Config::class)->findOneBy(['name' => $configName]);
        if (null !== $this->configObject) {
            $this->realConfig = @unserialize($this->configObject->getValue());
        }
    }

    /**
     * Get Custom Configuration.
     */
    public function get(string $name): ?array
    {
        return $this->realConfig[$name] ?? null;
    }

    /**
     * Get All Configuration.
     */
    public function getAll(): array
    {
        return !\is_array($this->realConfig) ? [] : $this->realConfig;
    }

    /**
     * Save Config Data.
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
                        if (\is_object($itemData)) {
                            // Get Entity Function
                            $choiceValue = $form->get($itemName)->getConfig()->getOption('choice_value');
                            $entityGetter = \is_string($choiceValue) ? 'get'.ucfirst($choiceValue) : 'getId';

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
                            $oldFile = $this->realConfig[$itemName] ?? false;
                            if (\is_array($oldFile)) {
                                $fs = new Filesystem();
                                foreach ($oldFile as $file) {
                                    $file = $this->parameterBag->get('upload_dir').$file;
                                    if ($fs->exists($file)) {
                                        $fs->remove($file);
                                    }
                                }
                            }

                            // Upload New File
                            $uploadManager = new UploadManager($this->parameterBag);
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
