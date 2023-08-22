<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CashFlowController;
use App\Http\Controllers\DashboardController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'login/', 301);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    Route::get('/dashboard',DashboardController::class)->name('dashboard');

    Route::prefix('client')->controller(ClientController::class)->group(function () {
        Route::get('/', 'index')->name('client.index');
        Route::post('/store', 'store')->name('client.store');
        Route::get('/{id}/edit', 'edit')->name('client.edit');
        Route::patch('/{id}/update', 'update')->name('client.update');
        Route::delete('/{id}/destroy/', 'destroy')->name('client.destroy');
    });

    Route::prefix('project')->controller(ProjectController::class)->group(function(){
        Route::get('/','index')->name('project.index');
        Route::post('/store','store')->name('project.store');
        Route::get('/{id}/edit','edit')->name('project.edit');
        Route::patch('/{id}/update','update')->name('project.update');
        Route::delete('/{id}/destroy','destroy')->name('project.destroy');
    });

    Route::prefix('cashflow')->controller(CashFlowController::class)->group(function(){
        Route::get('/','index')->name('cashflow.index');
        Route::post('/store','store')->name('cashflow.store');
        Route::get('/{id}/edit','edit')->name('cashflow.edit');
        Route::post('/update','update')->name('cashflow.update');
        Route::delete('/{id}/destroy','destroy')->name('cashflow.destroy');
    });

});
