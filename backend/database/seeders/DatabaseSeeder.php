<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => config('auth.admin.name'),
            'email' => config('auth.admin.email'),
            'email_verified_at' => now(),
            'password' => Hash::make(config('auth.admin.password')),
            'role' => 'admin',
            'is_active' => true,
            'remember_token' => Str::random(10),
        ]);
    }
}
