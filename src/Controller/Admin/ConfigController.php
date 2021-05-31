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
     */
    #[Route('/config', name: 'admin.config_general')]
    public function general(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(GeneralForm::class, $bag->getAll(), [
            'active_language' => $bag->get('active_language'),
        ]);

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $bag->saveForm($form);
            $this->addFlash('success', 'message.saved');

            return $this->redirectToRoute('admin.config_general');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * Media Settings.
     *
     * @IsGranted("ROLE_CONFIG_MEDIA")
     */
    #[Route('/config/media', name: 'admin.config_media')]
    public function media(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(MediaForm::class, $bag->getAll());

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $bag->saveForm($form);
            $this->addFlash('success', 'message.saved');

            return $this->redirectToRoute('admin.config_media');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * Account Settings.
     *
     * @IsGranted("ROLE_CONFIG_USER")
     */
    #[Route('/config/user', name: 'admin.config_user')]
    public function user(Request $request, ConfigBag $bag): Response
    {
        // Create Form
        $form = $this->createForm(UserForm::class, $bag->getAll());

        // Handle Request
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $bag->saveForm($form);
            $this->addFlash('success', 'message.saved');

            return $this->redirectToRoute('admin.config_user');
        }

        // Render Page
        return $this->render('admin/config/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
