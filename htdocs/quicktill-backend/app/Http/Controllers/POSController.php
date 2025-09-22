<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class POSController extends Controller {
    public function index() {
        $products = Product::orderBy('name')->get();
        return view('pos.index', compact('products'));
    }

    // Handles both form and JSON API checkout
    public function checkout(Request $request) {
        $items = $request->input('items'); // if form: JSON string; if API: array
        if (is_string($items)) $items = json_decode($items, true);

        $payment = $request->input('payment', 0);
        $total = collect($items)->sum(fn($i)=> $i['qty'] * $i['price']);
        $change = $payment - $total;

        $sale = null;
        DB::transaction(function() use($items, $total, $payment, $change, &$sale) {
            $sale = Sale::create([
                'user_id' => Auth::id(),
                'total' => $total,
                'payment' => $payment,
                'change' => $change,
            ]);
            foreach($items as $i){
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $i['product_id'],
                    'qty' => $i['qty'],
                    'price' => $i['price'],
                    'subtotal' => $i['qty'] * $i['price'],
                ]);
                \App\Models\Product::find($i['product_id'])?->decrement('stock', $i['qty']);
            }
        });

        if ($request->wantsJson() || $request->isJson()) {
            return response()->json(['sale_id'=>$sale->id,'change'=>$change]);
        }
        return redirect()->route('sales.show', $sale->id);
    }
}
