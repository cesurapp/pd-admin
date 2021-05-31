<?php

/**
 * This file is part of the pdAdmin package.
 *
 * @package     pd-admin
 * @license     LICENSE
 * @author      Ramazan APAYDIN <apaydin541@gmail.com>
 * @link        https://github.com/appaydin/pd-admin
 */

namespace App\Schedule;

use Zenstruck\ScheduleBundle\Schedule;
use Zenstruck\ScheduleBundle\Schedule\ScheduleBuilder;

/**
 * Cron Process List.
 *
 * @author Ramazan APAYDIN <apaydin541@gmail.com>
 */
class CronBuilder implements ScheduleBuilder
{
    public function buildSchedule(Schedule $schedule): void
    {
        // Set Timezone & Environment
        $schedule->timezone('UTC')->environments('prod', 'dev');

        /*$schedule
            ->addCommand('about')
            ->description('test')
            ->everyFiveMinutes();*/
    }
}
