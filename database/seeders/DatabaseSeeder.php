<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\MoneyBalance;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Fajar Abdurahman',
            'email' => 'fajar@fordigitalresource.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password!@#'),
        ]);
        User::create([
            'name' => 'Deny Fauzi',
            'email' => 'deny@fordigitalresource.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password!@#'),
        ]);
        User::create([
            'name' => 'Repi Risyan',
            'email' => 'repi@fordigitalresource.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password!@#'),
        ]);
        MoneyBalance::create([
            'balance' => 0,
        ]);
    }
}
