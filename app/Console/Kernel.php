<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Project;
class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            Project::where('project_type','2')->where('project_status',true)->whereDate('until',date('Y-m-d'))->update([
                'project_status' => false
            ]);
            Project::where('host_type','2')->where('contract_status',true)->whereDate('contract_until',date('Y-m-d'))->update([
                'contract_status' => false
            ]);
        })->daily();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
