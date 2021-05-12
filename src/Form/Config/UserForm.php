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

use App\Entity\Account\Group;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;

/**
 * User Settings Form.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class UserForm extends AbstractType
{
    public function __construct(private RouterInterface $router)
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user_registration', CheckboxType::class, [
                'label' => 'config.user.registration',
                'label_attr' => ['class' => 'checkbox-switch'],
                'help' => 'config.user.registration_help',
                'required' => false,
            ])
            ->add('user_default_group', EntityType::class, [
                'label' => 'config.user.default_group',
                'help' => 'config.user.default_group_help',
                'class' => Group::class,
                'choice_label' => 'name',
                'choice_value' => 'id',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_login_redirect', ChoiceType::class, [
                'label' => 'config.user.login_redirect',
                'help' => 'config.user.login_redirect_help',
                'choices' => $this->getAllRouter(),
                'empty_data' => 'admin.dashboard',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false
            ])
            ->add('user_logout_redirect', ChoiceType::class, [
                'label' => 'config.user.logout_redirect',
                'help' => 'config.user.logout_redirect_help',
                'choices' => $this->getAllRouter(),
                'empty_data' => 'security_login',
                'choice_translation_domain' => false,
                'placeholder' => false,
                'required' => false,
            ])
            ->add('user_email_confirmation', CheckboxType::class, [
                'label' => 'config.user.email_confirmation',
                'label_attr' => ['class' => 'checkbox-switch'],
                'help' => 'config.user.email_confirmation_help',
                'required' => false,
            ])
            ->add('user_welcome_email', CheckboxType::class, [
                'label' => 'config.user.welcome_email',
                'label_attr' => ['class' => 'checkbox-switch'],
                'help' => 'config.user.welcome_email_help',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'button.save',
            ]);
    }

    public function getAllRouter(): array
    {
        // Get Router Collection
        $allRouter = $this->router->getRouteCollection()->all();
        $routerList = [];

        // Set Route Name => Path
        foreach ($allRouter as $name => $route) {
            if (!mb_stristr($name, '_profiler') && !mb_stristr($name, '_wdt') && !mb_stristr($name, '_twig')) {
                $routerList[$name] = $route->getPath();
            }
        }

        // Return
        return array_flip($routerList);
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
