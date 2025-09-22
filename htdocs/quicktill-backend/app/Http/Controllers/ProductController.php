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

    // API: create product (admin)
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
        ]);
        if (!isset($data['stock'])) $data['stock'] = 0;
        $product = Product::create($data);
        return response()->json($product, 201);
    }

    // API: update product (admin)
    public function update(Request $request, Product $product) {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'sku' => 'sometimes|required|string|max:100|unique:products,sku,' . $product->id,
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|nullable|integer|min:0',
        ]);
        $product->update($data);
        return response()->json($product);
    }

    // API: delete product (admin)
    public function destroy(Product $product) {
        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
