<?php
namespace App\Http\Controllers;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller {
    public function show(Sale $sale) {
        $sale->load('items.product','user');
        return view('sales.show', compact('sale'));
    }

    public function checkout(Request $request) {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
            'payment' => 'required|numeric|min:0'
        ]);

        try {
            DB::beginTransaction();

            // Calculate total
            $total = 0;
            foreach ($request->items as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                $total += $product->price * $item['qty'];
            }

            // Check if payment is sufficient
            if ($request->payment < $total) {
                return response()->json(['message' => 'Insufficient payment'], 400);
            }

            // Create sale
            $sale = Sale::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'payment' => $request->payment,
                'change' => $request->payment - $total
            ]);

            // Create sale items
            foreach ($request->items as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                $price = $product->price;
                $quantity = $item['qty'];
                $subtotal = $price * $quantity;

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                    'subtotal' => $subtotal,
                ]);
            }

            DB::commit();

            // Attempt printing (non-fatal)
            $this->printReceipt($sale);

            return response()->json([
                'sale_id' => $sale->id,
                'total' => $total,
                'change' => $request->payment - $total
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout failed'], 500);
        }
    }

    protected function printReceipt(Sale $sale): void
    {
        try {
            $pairs = \App\Models\Setting::pluck('value', 'key');
            $host = $pairs['printer_host'] ?? null;
            $port = isset($pairs['printer_port']) ? (int)$pairs['printer_port'] : 9100;
            if (!$host) return; // not configured

            $storeName = $pairs['store_name'] ?? 'QuickTill';
            $footer = $pairs['receipt_footer'] ?? 'Thank you for your purchase!';

            $sale->loadMissing('items', 'user');

            $connector = new \Mike42\Escpos\PrintConnectors\NetworkPrintConnector($host, $port);
            $printer = new \Mike42\Escpos\Printer($connector);

            // Header
            $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_CENTER);
            $printer->selectPrintMode(\Mike42\Escpos\Printer::MODE_DOUBLE_WIDTH);
            $printer->text($storeName . "\n");
            $printer->selectPrintMode();
            $printer->text("Receipt\n");
            $printer->text(str_repeat('-', 32) . "\n");

            // Meta
            $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_LEFT);
            $printer->text(sprintf("Sale ID: #%d\n", $sale->id));
            $printer->text("Cashier: " . ($sale->user->name ?? 'Unknown') . "\n");
            $printer->text(date('Y-m-d H:i:s') . "\n");
            $printer->text(str_repeat('-', 32) . "\n");

            // Items
            foreach ($sale->items as $it) {
                $name = $it->product->name ?? (string)$it->product_id;
                $lineTotal = $it->price * $it->quantity;
                $printer->text($name . "\n");
                $printer->text(sprintf(" %dx %s\n", $it->quantity, number_format($it->price)));
                $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_RIGHT);
                $printer->text("Rp " . number_format($lineTotal) . "\n");
                $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_LEFT);
            }
            $printer->text(str_repeat('-', 32) . "\n");

            // Totals
            $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_RIGHT);
            $printer->text("TOTAL  Rp " . number_format($sale->total) . "\n");
            $printer->text("PAY    Rp " . number_format($sale->payment) . "\n");
            $printer->text("CHANGE Rp " . number_format($sale->change) . "\n");

            // Footer
            $printer->setJustification(\Mike42\Escpos\Printer::JUSTIFY_CENTER);
            $printer->text(str_repeat('-', 32) . "\n");
            $printer->text($footer . "\n");
            $printer->cut();
            $printer->pulse();
            $printer->close();
        } catch (\Throwable $e) {
            // Swallow printing errors to not block checkout
        }
    }
}
