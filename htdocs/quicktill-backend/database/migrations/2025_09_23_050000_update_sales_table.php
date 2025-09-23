<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSalesTable extends Migration
{
    public function up()
    {
        Schema::table('sales', function (Blueprint $table) {
            // Drop existing columns
            $table->dropColumn(['payment', 'change']);
            
            // Add new columns
            $table->string('customer_name')->nullable();
            $table->string('payment_method')->default('cash');
            $table->string('payment_status')->default('completed');
            $table->text('notes')->nullable();
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->renameColumn('total', 'total_amount');
        });
    }

    public function down()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->decimal('payment', 10, 2);
            $table->decimal('change', 10, 2);
            
            $table->dropColumn([
                'customer_name',
                'payment_method',
                'payment_status',
                'notes',
                'subtotal',
                'tax',
                'discount'
            ]);
            
            $table->renameColumn('total_amount', 'total');
        });
    }
}