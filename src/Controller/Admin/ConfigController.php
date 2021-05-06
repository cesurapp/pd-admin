<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller\Admin;

use App\Form\Config\ContactForm;
use App\Form\Config\GeneralForm;
use App\Form\Config\MediaForm;
use App\Form\Config\UserForm;
use App\Service\ConfigBag;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller managing the config.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class ConfigController extends AbstractController
{
    /**
     * General Configuration.
     *
     * @IsGranted("ROLE_CONFIG_GENERAL")
     * @Route(name="admin_config_general", path="/config")
     */
    public function general(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(GeneralForm::class, $bag->getAll(), ['active_language' => $bag->get('active_language')]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save DB
            $bag->saveForm($form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_config_general');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'config_general',
        ]);
    }

    /**
     * Contact Settings.
     *
     * @IsGranted("ROLE_CONFIG_CONTACT")
     * @Route(name="admin_config_contact", path="/config/contact")
     */
    public function contact(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(ContactForm::class, $bag->getAll());

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $bag->saveForm($form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_config_contact');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'config_contact',
        ]);
    }

    /**
     * Media Settings.
     *
     * @IsGranted("ROLE_CONFIG_MEDIA")
     * @Route(name="admin_config_media", path="/config/media")
     */
    public function media(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(MediaForm::class, $bag->getAll());

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Save Config
            $bag->saveForm($form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_config_media');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'config_media',
        ]);
    }

    /**
     * Account Settings.
     *
     * @IsGranted("ROLE_CONFIG_USER")
     * @Route(name="admin_config_user", path="/config/user")
     */
    public function user(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(UserForm::class, $bag->getAll(), ['router' => $this->get('router')]);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Save Config
            $bag->saveForm($form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_config_user');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'config_user',
        ]);
    }
}
