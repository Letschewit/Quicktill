<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Profile (all users)
    Route::put('/profile/name', [ProfileController::class, 'updateName']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    // Sales endpoints
    Route::get('/sales/stats', [SalesController::class, 'stats']);
    Route::apiResource('sales', SalesController::class);
    
    // Products endpoints
    Route::get('/products/categories', [ProductController::class, 'categories']);
    Route::get('/products/stock-alert', [ProductController::class, 'stockAlert']);
    Route::post('/products/{product}/adjust-stock', [ProductController::class, 'adjustStock']);
    Route::apiResource('products', ProductController::class);

    // Settings: GET for all authenticated users
    Route::get('/settings', [SettingController::class, 'index']);

    // Admin-only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('products', ProductController::class);
        Route::get('/users', [AuthController::class, 'index']); // manage users
        Route::patch('/users/{user}/role', [AuthController::class, 'updateRole']);
        Route::delete('/users/{user}', [AuthController::class, 'destroy']);
        Route::put('/settings', [SettingController::class, 'update']);
        Route::post('/settings/logo', [SettingController::class, 'uploadLogo']);
    });

    Route::middleware('role:cashier,admin')->group(function () {
        Route::get('/products', [ProductController::class, 'apiIndex']); // public products for POS
        Route::post('/pos/checkout', [SaleController::class, 'checkout']);
        Route::get('/sales/{sale}', [SaleController::class, 'show']);
    });
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});