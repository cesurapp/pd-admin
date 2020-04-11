<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Controller;

use App\Form\Config\ContactForm;
use App\Form\Config\GeneralForm;
use App\Form\Config\MediaForm;
use App\Form\Config\UserForm;
use App\Service\ConfigBag;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller managing the settings.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class SettingsController extends AbstractController
{
    /**
     * General Settings.
     *
     * @IsGranted("ROLE_SETTINGS_GENERAL")
     * @Route(name="admin_settings_general", path="/settings")
     *
     * @return RedirectResponse|Response
     */
    public function general(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(GeneralForm::class, $bag->getAll(), ['active_language' => $bag->get('active_language')]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save DB
            $bag->saveToDB($this->getDoctrine()->getManager(), $form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_settings_general');
        }

        // Render Page
        return $this->render('Admin/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_general',
            'page_description' => 'settings_general_desc',
        ]);
    }

    /**
     * Contact Settings.
     *
     * @IsGranted("ROLE_SETTINGS_CONTACT")
     * @Route(name="admin_settings_contact", path="/settings/contact")
     */
    public function contact(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(ContactForm::class, $bag->getAll());

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save
            $bag->saveToDB($this->getDoctrine()->getManager(), $form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_settings_contact');
        }

        // Render Page
        return $this->render('Admin/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_contact',
            'page_description' => 'settings_contact_desc',
        ]);
    }

    /**
     * Media Settings.
     *
     * @IsGranted("ROLE_SETTINGS_MEDIA")
     * @Route(name="admin_settings_media", path="/settings/media")
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
            $bag->saveToDB($this->getDoctrine()->getManager(), $form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_settings_media');
        }

        // Render Page
        return $this->render('Admin/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_media',
            'page_description' => 'settings_media_desc',
        ]);
    }

    /**
     * Account Settings.
     *
     * @IsGranted("ROLE_SETTINGS_USER")
     * @Route(name="admin_settings_user", path="/settings/user")
     *
     * @return RedirectResponse|Response
     */
    public function user(Request $request, ConfigBag $bag)
    {
        // Create Form
        $form = $this->createForm(UserForm::class, $bag->getAll(), ['router' => $this->get('router')]);

        // Handle Request
        $form->handleRequest($request);

        // Submit & Valid Form
        if ($form->isSubmitted() && $form->isValid()) {
            // Save Config
            $bag->saveToDB($this->getDoctrine()->getManager(), $form);

            // Flash Message
            $this->addFlash('success', 'changes_saved');

            // Refresh Page
            return $this->redirectToRoute('admin_settings_user');
        }

        // Render Page
        return $this->render('Admin/Settings/index.html.twig', [
            'form' => $form->createView(),
            'page_title' => 'settings_user',
            'page_description' => 'settings_user_desc',
        ]);
    }
}
