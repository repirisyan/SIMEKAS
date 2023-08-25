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
        return Inertia::render('Dashboard',[
            'saldo' => fn() => MoneyBalance::value('balance'),
            'pemasukan' => fn() =>  CashFlow::select('amount','type','created_at')->where('type','1')->whereYear('created_at',date('Y'))->sum('amount'),
            'pengeluaran' => fn() => CashFlow::select('amount','type','created_at')->where('type','2')->whereYear('created_at',date('Y'))->sum('amount'),
            'client' => fn() => Client::count(),
            'project' => fn() => Project::count(),
            'chart' => fn() => CashFlow::selectRaw('year(created_at) years, sum(amount) as data,type')->groupBy('type','years')->orderBy('years','asc')->get()
        ]);
    }
}
