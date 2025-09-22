<?php
namespace App\Http\Controllers;
use App\Models\Sale;

class SaleController extends Controller {
    public function show(Sale $sale) {
        $sale->load('items.product','user');
        return view('sales.show', compact('sale'));
    }
}
