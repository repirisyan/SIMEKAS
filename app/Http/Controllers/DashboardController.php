<?php

namespace App\Http\Controllers;

use App\Models\CashFlow;
use App\Models\Client;
use App\Models\MoneyBalance;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Concurrency;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        [$saldo, $pemasukan, $pengeluaran, $client, $project, $chart] = Concurrency::run([
            fn () => MoneyBalance::value('balance'),
            fn () => CashFlow::select('amount', 'type', 'created_at')->where('type', '1')->whereYear('created_at', date('Y'))->sum('amount'),
            fn () => CashFlow::select('amount', 'type', 'created_at')->where('type', '2')->whereYear('created_at', date('Y'))->sum('amount'),
            fn () => Client::count(),
            fn () => Project::count(),
            fn () => CashFlow::selectRaw('year(created_at) years, sum(amount) as data,type')->groupBy('type', 'years')->orderBy('years', 'asc')->get(),
        ]);

        return Inertia::render('Dashboard', [
            'saldo' => $saldo,
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'client' => $client,
            'project' => $project,
            'chart' => $chart,
        ]);
    }
}
