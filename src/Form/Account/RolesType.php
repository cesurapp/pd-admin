<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Form\Account;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class RolesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // Roles
        $builder
            ->add('acl', ChoiceType::class, [
                'label' => false,
                'multiple' => false,
                'expanded' => true,
                'choices' => $options['acl'],
                'choice_label' => static function ($val, $key, $index) {
                    return $key.'.title';
                },
                'mapped' => false,
                'data' => key(array_intersect($options['acl'], $options['userRoles'])),
            ])
            ->add('aclprocess', ChoiceType::class, [
                'label' => false,
                'multiple' => true,
                'expanded' => true,
                'choices' => [
                    'ROLE_ALLOWED_TO_SWITCH.title' => 'ROLE_ALLOWED_TO_SWITCH',
                ],
                'mapped' => false,
                'data' => $options['userRoles'],
                'required' => false,
            ])
            ->add('roles', ChoiceType::class, [
                'label' => false,
                'multiple' => true,
                'expanded' => true,
                'choices' => $options['roles'],
                'choice_label' => static function ($val, $key, $index) {
                    $s = explode('_', $val);

                    return 3 === \count($s) ? $s[0].'_'.$s[1].'.'.$key : $val;
                },
                'choice_name' => static function ($val) {
                    return $val;
                },
                'data' => $options['userRoles'],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'save',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired([
                'roles',
                'acl',
                'userRoles',
            ]);
    }
}
