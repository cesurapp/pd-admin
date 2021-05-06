<?php

namespace App\Listener;

use App\Service\ConfigBag;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Change System Default Language
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class LocaleListener implements EventSubscriberInterface
{
    private ConfigBag $bag;

    public function __construct(ConfigBag $bag)
    {
        $this->bag = $bag;
    }

    public function setDefaultLocale(KernelEvent $event): void
    {
        $event->getRequest()->setDefaultLocale($this->bag->get('default_locale'));
    }

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::REQUEST => [['setDefaultLocale', 99]]];
    }
}
