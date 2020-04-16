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

use App\Library\Tools;
use Intervention\Image\Image;
use Intervention\Image\ImageManager;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Upload File Service.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class FileUpload
{
    /**
     * Current Upload Directory.
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
     * @var ConfigBag
     */
    private $bag;

    public function __construct(ConfigBag $bag)
    {
        $this->bag = $bag;
    }

    /**
     * Upload Files & Encode ImageManager.
     *
     * @param $files array|UploadedFile
     * @param bool $rawUpload
     *
     * @return array
     */
    public function upload($files, $rawUpload = false): array
    {
        $this->createDirectory();

        // Uploaded Files
        $uploadFiles = [];

        // Convert Array
        if ($files instanceof UploadedFile) {
            $files = [$files];
        }

        // Start Upload
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadFiles[] = $this->uploadProcess($file, $rawUpload);
            }
        }

        // Return Uploaded Files
        return $uploadFiles;
    }

    /**
     * Remove Files.
     *
     * @param string|array $files
     */
    public static function removeFiles($files): void
    {
        if ($files) {
            // Convert Array
            if (!\is_array($files)) {
                $files = [$files];
            }

            foreach ($files as $file) {
                $file = Tools::uploadDir($file);
                if (file_exists($file)) {
                    unlink($file);
                }
            }
        }
    }

    /**
     * Start Upload.
     *
     * @param $rawUpload boolean
     *
     * @return string
     */
    private function uploadProcess(UploadedFile $file, bool $rawUpload): string
    {
        // Create Filename
        $fileName = Tools::webalize(Tools::randomStr(6).$file->getClientOriginalName(), '.');

        // Upload File and Optimize Images
        if (!$rawUpload) {
            switch ($file->getClientMimeType()) {
                case image_type_to_mime_type(IMAGETYPE_JPEG):
                case image_type_to_mime_type(IMAGETYPE_PNG):
                    $this->imageManager($file, $this->currentPath.'/'.$fileName);
                    break;
                default:
                    $file->move($this->currentPath, $fileName);
            }
        } else {
            $file->move($this->currentPath, $fileName);
        }

        // Return Filename
        return $this->currentDir.'/'.$fileName;
    }

    /**
     * Image Process Manager.
     *
     * @param $filePath string
     */
    private function imageManager(UploadedFile $file, $filePath): void
    {
        // Create Image Manager
        $img = new ImageManager(['driver' => $this->bag->get('media_library')]);
        $img = $img->make($file->getRealPath());

        // Image Optimize
        if ($this->bag->get('media_optimize')) {
            $img->resize($this->bag->get('media_max_height'), $this->bag->get('media_max_width'), static function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            });
        }

        // Image Add Watermark
        switch ($this->bag->get('media_watermark')) {
            case 'text':
                $this->addTextWatermark($img);
                break;
            case 'image':
                $this->addImageWatermark($img);
                break;
        }

        // Save Image
        $img->save($filePath, $this->bag->get('media_optimize') ? $this->bag->get('media_quality') : null)->destroy();
    }

    /**
     * Image Add Text Watermark.
     */
    private function addTextWatermark(Image $img): void
    {
        // Set X-Y Image Ordinate
        $xOrdinate = $img->getWidth() * $this->bag->get('media_wm_font_x');
        $yOrdinate = $img->getHeight() * $this->bag->get('media_wm_font_y');

        // Add Text Watermark
        $img->text($this->bag->get('media_wm_font_text'), $xOrdinate, $yOrdinate, function ($font) {
            // Exist Font File
            if (!empty($this->bag->get('media_wm_font')) && file_exists($fontPath = Tools::uploadDir($this->bag->get('media_wm_font')))) {
                $font->file($fontPath);
            }

            $font->size($this->bag->get('media_wm_font_size'));
            $font->color($this->bag->get('media_wm_font_color'));
            $font->align($this->bag->get('media_wm_font_align'));
            $font->valign($this->bag->get('media_wm_font_valign'));
            $font->angle($this->bag->get('media_wm_font_angle'));
        });
    }

    /**
     * Image Add Watermark.
     */
    private function addImageWatermark(Image $img): void
    {
        if (file_exists($imagePath = Tools::uploadDir($this->bag->get('media_wm_image')))) {
            $img->insert($imagePath,
                $this->bag->get('media_wm_image_position'),
                $this->bag->get('media_wm_image_x'),
                $this->bag->get('media_wm_image_y')
            );
        }
    }

    /**
     * Create Upload Directory.
     */
    private function createDirectory(): void
    {
        // Create Current Directory
        $this->currentDir = date('Y/m/d');
        $this->currentPath = Tools::uploadDir($this->currentDir);

        // Create Directory
        if (!file_exists($this->currentPath)) {
            $fs = new Filesystem();
            $fs->mkdir($this->currentPath);
        }
    }
}
