<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@quicktill.com'],
            [
                'name' => 'admin',
                'password' => Hash::make('password'),
                'role' => 'admin'
            ]
        );

        // Create Cashier User
        User::updateOrCreate(
            ['email' => 'cashier@quicktill.com'],
            [
                'name' => 'cashier',
                'password' => Hash::make('password'),
                'role' => 'cashier'
            ]
        );

        $this->command->info('Users created successfully!');
    }
}


