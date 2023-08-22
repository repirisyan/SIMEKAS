<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MoneyBalance;
use App\Models\CashFlow;
use App\Models\Client;
use App\Models\Project;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $saldo = MoneyBalance::value('balance');
        $pemasukan = CashFlow::select('amount','type','created_at')->where('type','1')->whereYear('created_at',date('Y'))->sum('amount');
        $pengeluaran = CashFlow::select('amount','type','created_at')->where('type','2')->whereYear('created_at',date('Y'))->sum('amount');
        $client = Client::count();
        $project = Project::count();
        return Inertia::render('Dashboard',[
            'saldo' => $saldo,
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'client' => $client,
            'project' => $project
        ]);
    }
}
