<?php
namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    // For web (Blade)
    public function index() {
        $products = Product::orderBy('name')->get();
        return view('products.index', compact('products'));
    }

    // Simple API endpoint
    public function apiIndex() {
        return Product::orderBy('name')->get();
    }
}
