<?php

namespace App\DataTable;

use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Twig\Environment;

class DataTableMessageHandler implements MessageHandlerInterface
{
    public function __construct(private Environment $twig)
    {
    }

    public function __invoke(DataTableMessage $message)
    {
    }
}
