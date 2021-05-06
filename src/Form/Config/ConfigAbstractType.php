<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Config;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Config Type.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
abstract class ConfigAbstractType implements FormTypeInterface
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        // Entity Type Load Default Choices
        foreach ($form->all() as $key => $formInterface) {
            if ('entity' === $formInterface->getConfig()->getType()->getBlockPrefix()) {
                if (!\is_object($formInterface->getNormData())) {
                    $entityColumn = is_string($obj = $formInterface->getConfig()->getOption('choice_value')) ? $obj : $obj[0]->getIdField();

                    $em = $formInterface->getConfig()->getOption('em');
                    if ($em instanceof EntityManagerInterface) {
                        // Find Item
                        $data = $em->getRepository($formInterface->getConfig()->getOption('class'))
                            ->findOneBy([$entityColumn => $formInterface->getData()]);

                        // Set Data
                        if (null !== $data) {
                            $formInterface->setData($data);
                        }
                    }
                }
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function finishView(FormView $view, FormInterface $form, array $options)
    {

        // Create File Type File Path
       /* foreach ($form->all() as $key => $formInterface) {
            if ('file' === $formInterface->getConfig()->getType()->getBlockPrefix()) {
                if ($formInterface->getViewData()) {
                    $view->children[$key]->vars['file_path'] = !is_array($formInterface->getViewData()) ? [$formInterface->getViewData()] : $formInterface->getViewData();
                } elseif (!$formInterface->getViewData() && isset($options['data'][$key])) {
                    $view->children[$key]->vars['file_path'] = $options['data'][$key];
                }
            }
        }*/


    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return FormType::class;
    }
}
