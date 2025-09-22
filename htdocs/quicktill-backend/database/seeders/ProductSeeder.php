<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder {
    public function run(): void {
        Product::create(['name'=>'Coca Cola','sku'=>'111','price'=>10000,'stock'=>50]);
        Product::create(['name'=>'Pepsi','sku'=>'112','price'=>9000,'stock'=>40]);
        Product::create(['name'=>'Mineral Water','sku'=>'113','price'=>5000,'stock'=>200]);
    }
}
