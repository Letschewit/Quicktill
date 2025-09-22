@extends('layouts.app')
@section('content')
<div id="receipt">
  <h2>Invoice: #{{ $sale->id }}</h2>
  <div>Date: {{ $sale->created_at }}</div>
  <div>Cashier: {{ $sale->user?->name ?? '—' }}</div>

  <table class="w-full mt-2 border">
    <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
    <tbody>
      @foreach($sale->items as $it)
      <tr>
        <td>{{ $it->product?->name }}</td>
        <td>{{ $it->qty }}</td>
        <td>{{ number_format($it->price,0,',','.') }}</td>
        <td>{{ number_format($it->subtotal,0,',','.') }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>

  <div class="mt-2">Total: {{ number_format($sale->total,0,',','.') }}</div>
  <div>Payment: {{ number_format($sale->payment,0,',','.') }}</div>
  <div>Change: {{ number_format($sale->change,0,',','.') }}</div>
</div>

<button onclick="window.print()" class="mt-4 p-2 bg-gray-700 text-white">Print Receipt</button>
@endsection
