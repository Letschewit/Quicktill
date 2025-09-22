<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('products', ProductController::class);
        Route::get('/users', [AuthController::class, 'index']); // manage users
    });

    Route::middleware('role:cashier,admin')->group(function () {
        Route::post('/pos/checkout', [SaleController::class, 'checkout']);
        Route::get('/sales/{sale}', [SaleController::class, 'show']);
    });

});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/users', [AuthController::class, 'index']);
    Route::patch('/users/{user}/role', [AuthController::class, 'updateRole']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});