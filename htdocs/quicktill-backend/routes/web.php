<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function(){
    Route::get('/pos', [App\Http\Controllers\POSController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [App\Http\Controllers\POSController::class, 'checkout'])->name('pos.checkout');
    Route::get('/sales/{sale}', [App\Http\Controllers\SaleController::class, 'show'])->name('sales.show');
    Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
});

require __DIR__.'/auth.php';
