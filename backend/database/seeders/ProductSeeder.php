<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 0; $i <= 50; $i++) {
            Products::create([
                "name" => fake()->name(),
                "price" => fake()->numberBetween(40000, 80000),
                "image" => ""
            ]);
        }
    }
}
