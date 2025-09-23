<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesController extends Controller
{
    public function index(Request $request)
    {
        $query = Sale::with(['items.product', 'user']);

        // Date filtering
        if ($request->date_filter) {
            switch ($request->date_filter) {
                case 'today':
                    $query->whereDate('created_at', Carbon::today());
                    break;
                case 'week':
                    $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                    break;
                case 'month':
                    $query->whereMonth('created_at', Carbon::now()->month)
                          ->whereYear('created_at', Carbon::now()->year);
                    break;
                case 'custom':
                    if ($request->start_date && $request->end_date) {
                        $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
                    }
                    break;
            }
        }

        $sales = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($sales);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:1',
            'customer_name' => 'nullable|string',
            'payment_method' => 'required|in:cash,card,other',
            'payment_status' => 'required|in:pending,completed,failed',
            'notes' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }
                $subtotal += $product->price * $item['quantity'];
            }

            $tax = $subtotal * 0.1; // 10% tax
            $total = $subtotal + $tax;

            $sale = Sale::create([
                'user_id' => auth()->id(),
                'customer_name' => $validated['customer_name'],
                'payment_method' => $validated['payment_method'],
                'payment_status' => $validated['payment_status'],
                'notes' => $validated['notes'],
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total_amount' => $total
            ]);

            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $product->price * $item['quantity']
                ]);

                // Update stock
                $product->decrement('stock', $item['quantity']);
            }

            DB::commit();
            return response()->json($sale->load('items.product'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function show(Sale $sale)
    {
        return response()->json($sale->load(['items.product', 'user']));
    }

    public function stats()
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $lastMonth = Carbon::now()->subMonth();

        $stats = [
            'today' => [
                'total_sales' => Sale::whereDate('created_at', $today)->sum('total_amount'),
                'total_orders' => Sale::whereDate('created_at', $today)->count(),
            ],
            'month' => [
                'total_sales' => Sale::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('total_amount'),
                'total_orders' => Sale::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
            ],
            'chart_data' => $this->getChartData(),
        ];

        // Calculate percentage changes
        if ($stats['month']['total_sales'] > 0) {
            $lastMonthSales = Sale::whereBetween('created_at', [$lastMonth->startOfMonth(), $lastMonth->endOfMonth()])->sum('total_amount');
            $stats['month']['percentage_change'] = (($stats['month']['total_sales'] - $lastMonthSales) / $lastMonthSales) * 100;
        }

        return response()->json($stats);
    }

    private function getChartData()
    {
        $days = collect(range(1, Carbon::now()->daysInMonth))->map(function ($day) {
            $date = Carbon::now()->setDay($day)->format('Y-m-d');
            return [
                'date' => $date,
                'sales' => Sale::whereDate('created_at', $date)->sum('total_amount'),
                'orders' => Sale::whereDate('created_at', $date)->count(),
            ];
        });

        return $days;
    }
}