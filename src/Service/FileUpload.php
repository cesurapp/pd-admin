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

use Gregwar\Image\Image;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\ByteString;
use Symfony\Component\String\Slugger\AsciiSlugger;

/**
 * Upload File Service.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class FileUpload
{
    private string $currentDir;
    private string $currentPath;

    public function __construct(
        private ConfigBag $bag)
    {
    }

    /**
     * Upload Files & Encode ImageManager.
     */
    public function upload(array|UploadedFile $files, bool $rawUpload = false): array
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
     */
    public static function removeFiles(array|string $files): void
    {
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

    /**
     * Start Upload.
     */
    private function uploadProcess(UploadedFile $file, bool $rawUpload): string
    {
        // Create Filename
        $fileName = (new AsciiSlugger())->slug(
                ByteString::fromRandom(3) . '-' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)
            ) . '.' . $file->guessClientExtension();

        // Upload File and Optimize Images
        if (!$rawUpload) {
            switch ($file->getClientMimeType()) {
                case image_type_to_mime_type(IMAGETYPE_JPEG):
                case image_type_to_mime_type(IMAGETYPE_PNG):
                    $this->imageManager($file, $this->currentPath . '/' . $fileName);
                    break;
                default:
                    $file->move($this->currentPath, $fileName);
            }
        } else {
            $file->move($this->currentPath, $fileName);
        }

        // Return Filename
        return $this->currentDir . '/' . $fileName;
    }

    /**
     * Image Process Manager.
     */
    private function imageManager(UploadedFile $file, string $filePath): void
    {
        // Create Image Manager
        $img = Image::open($file->getRealPath());

        // Image Optimize
        if ($this->bag->get('media_optimize')) {
            $img->scaleResize($this->bag->get('media_max_width'), $this->bag->get('media_max_height'), 'transparent', true);
        }

        // Save Image
        $img->save($filePath, 'guess', $this->bag->get('media_optimize') ? (int)$this->bag->get('media_quality') : 80);
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
