<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\MoneyBalance;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Denny',
            'email' => 'denny@fordigitalresource.com',
            'email_verified_at' => now(),
            'password' => Hash::make('fdr123!@#'),
        ]);
        User::create([
            'name' => 'Fajar',
            'email' => 'Fajar@fordigitalresource.com',
            'email_verified_at' => now(),
            'password' => Hash::make('fdr123!@#'),
        ]);
        MoneyBalance::create([
            'balance' => 0
        ]);
    }
}
