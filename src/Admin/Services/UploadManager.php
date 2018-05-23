<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pdAdmin
 *
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2018 pdAdmin
 * @license     LICENSE
 *
 * @link        http://pdadmin.ramazanapaydin.com
 */

namespace App\Admin\Services;

use Intervention\Image\Image;
use Intervention\Image\ImageManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Upload Files.
 *
 * @author  Ramazan Apaydın <iletisim@ramazanapaydin.com>
 */
class UploadManager
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * Current Upload Directory
     * Y/M/D/Image.
     *
     * @var string
     */
    private $currentDir;

    /**
     * Upload Relative Path.
     *
     * @var string
     */
    private $currentPath;

    /**
     * Upload constructor.
     *
     * @param ContainerInterface $container
     * @param bool               $writeMode
     */
    public function __construct(ContainerInterface $container, $writeMode = true)
    {
        $this->container = $container;

        // Set Directory
        if ($writeMode) {
            $this->createDirectory();
        }
    }

    /**
     * Create File Upload Directory.
     */
    private function createDirectory()
    {
        // Create Current Directory
        $this->currentDir = date(str_replace('-', '/', $this->cfg('media_directory_map')));
        $this->currentPath = $this->cfg('upload_dir').$this->currentDir;

        // Create Directory
        if (!file_exists($this->currentPath)) {
            // Create Filesystem
            $fs = new Filesystem();

            // Create Dir
            $fs->mkdir($this->currentPath);
        }
    }

    /**
     * Get Parameter.
     *
     * @param $parameterName string
     *
     * @return mixed
     */
    private function cfg($parameterName)
    {
        return $this->container->getParameter($parameterName);
    }

    /**
     * Upload Files & Encode ImageManager.
     *
     * @param $files array|UploadedFile
     * @param bool $raw
     *
     * @return array|bool
     */
    public function upload($files, $raw = false)
    {
        // Uploaded Files
        $upFiles = [];

        // Start Upload
        if (is_array($files)) {
            foreach ($files as $file) {
                $upFiles[] = $this->uploadProcess($file, $raw);
            }
        } elseif ($files instanceof UploadedFile) {
            $upFiles[] = $this->uploadProcess($files, $raw);
        }

        // Return Uploaded Files
        return count($upFiles) > 0 ? $upFiles : false;
    }

    /**
     * Start Upload.
     *
     * @param UploadedFile $file
     * @param $raw boolean
     *
     * @return string
     */
    private function uploadProcess(UploadedFile $file, $raw)
    {
        // Create Filename
        $fileName = (new Utils())->slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)).
            uniqid(mt_rand(0, 5)).'.'.$file->getClientOriginalExtension();

        // Enable Image Optimization
        if (!$raw && $this->cfg('media_optimize')) {
            switch ($file->getClientMimeType()) {
                case image_type_to_mime_type(IMAGETYPE_JPEG):
                case image_type_to_mime_type(IMAGETYPE_PNG):
                    $this::imageManager($file, $this->currentPath.'/'.$fileName);
                    break;
            }
        } else {
            // Move File
            $file->move($this->currentPath, $fileName);
        }

        // Return Filename
        return $this->currentDir.'/'.$fileName;
    }

    /**
     * Image Process Manager.
     *
     * @param UploadedFile $file
     * @param $filePath string
     */
    private function imageManager(UploadedFile $file, $filePath)
    {
        // Create Image Manager
        $img = new ImageManager(['driver' => $this->cfg('media_library')]);

        // Resize
        $img = $img
            ->make($file->getRealPath())
            ->resize($this->cfg('media_max_height'), $this->cfg('media_max_width'), function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            });

        // Add Watermark
        switch ($this->cfg('media_watermark')) {
            case 'text':
                $this->addTextWatermark($img);
                break;
            case 'image':
                $this->addImageWatermark($img);
                break;
        }

        $img->save($filePath, $this->cfg('media_quality'))->destroy();
    }

    /**
     * Image Add Text Watermark.
     *
     * @param Image $image
     */
    private function addTextWatermark(&$image)
    {
        // Set X-Y Image Ordinate
        $xOrdinate = $image->getWidth() * $this->cfg('media_wm_font_x');
        $yOrdinate = $image->getHeight() * $this->cfg('media_wm_font_y');

        // Add Text Watermark
        $image->text($this->cfg('media_wm_font_text'), $xOrdinate, $yOrdinate, function ($font) {
            // Exist Font File
            if (!empty($this->cfg('media_wm_font')) && file_exists($fontPath = $this->cfg('upload_dir').$this->cfg('media_wm_font'))) {
                $font->file($fontPath);
            }

            $font->size($this->cfg('media_wm_font_size'));
            $font->color($this->cfg('media_wm_font_color'));
            $font->align($this->cfg('media_wm_font_align'));
            $font->valign($this->cfg('media_wm_font_valign'));
            $font->angle($this->cfg('media_wm_font_angle'));
        });
    }

    /**
     * Image Add Image Watermark.
     *
     * @param Image $image
     */
    private function addImageWatermark(&$image)
    {
        if (file_exists($imagePath = $this->cfg('upload_dir').$this->cfg('media_wm_image'))) {
            $image->insert(
                $imagePath,
                $this->cfg('media_wm_image_position'),
                $this->cfg('media_wm_image_x'),
                $this->cfg('media_wm_image_y')
            );
        }
    }
}
