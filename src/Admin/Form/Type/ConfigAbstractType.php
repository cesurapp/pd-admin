<?php

namespace App\Admin\Form\Type;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class AbstractType
 * @package App\Admin\Form\Type
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
abstract class ConfigAbstractType implements FormTypeInterface
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        // Entity Type Load Default Choices
        foreach ($form->all() as $key => $formInterface) {
            if ($formInterface->getConfig()->getType()->getBlockPrefix() === 'entity') {
                if (!is_object($formInterface->getNormData())) {
                    $entityColumn = (is_string($obj = $formInterface->getConfig()->getOption('choice_value'))) ? $obj : $obj[0]->getIdField();

                    $em = $formInterface->getConfig()->getOption('em');
                    if ($em instanceof EntityManagerInterface) {
                        // Find Item
                        $data = $em->getRepository($formInterface->getConfig()->getOption('class'))
                            ->findOneBy([$entityColumn => $formInterface->getData()]);

                        // Set Data
                        if (null !== $data)
                            $formInterface->setData($data);
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
        foreach ($form->all() as $key => $formInterface) {
            if ($formInterface->getConfig()->getType()->getBlockPrefix() === 'file') {
                if (is_array($formInterface->getViewData())) {
                    $view->children[$key]->vars['file_path'] = $formInterface->getViewData();
                } else if (!$formInterface->getViewData() && isset($options['data'][$key])) {
                    $view->children[$key]->vars['file_path'] = $options['data'][$key];
                }
            }
        }
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
        return 'Symfony\Component\Form\Extension\Core\Type\FormType';
    }
}
