@extends('layouts.app')
@section('content')
<h1 class="text-2xl mb-4">QuickTill POS</h1>
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">
    <input type="text" id="barcodeInput" class="border p-2 mb-2 w-full" placeholder="Scan or enter SKU">
    <div class="grid grid-cols-4 gap-2">
      @foreach($products as $p)
      <div class="border p-2 cursor-pointer product-card" data-id="{{ $p->id }}" data-sku="{{ $p->sku }}" data-name="{{ $p->name }}" data-price="{{ $p->price }}">
        <h3 class="font-bold">{{ $p->name }}</h3>
        <div>Rp {{ number_format($p->price,0,',','.') }}</div>
      </div>
      @endforeach
    </div>
  </div>

  <div>
    <h2 class="font-bold">Cart</h2>
    <div id="cart-list"></div>
    <div class="mt-4">
      <label>Payment</label>
      <input id="payment" type="number" step="0.01" class="border p-1 w-full">
      <button id="checkoutBtn" class="mt-2 p-2 bg-blue-600 text-white">Checkout</button>
    </div>
  </div>
</div>

<form id="checkoutForm" method="POST" action="{{ route('pos.checkout') }}" style="display:none;">
  @csrf
  <input type="hidden" name="items" id="itemsInput">
  <input type="hidden" name="payment" id="paymentInput">
</form>
@endsection

@push('scripts')
<script>
(function(){
  const products = Array.from(document.querySelectorAll('.product-card')).map(el=>({
    id: el.dataset.id, name: el.dataset.name, price: parseFloat(el.dataset.price), sku: el.dataset.sku
  }));
  const cart = [];

  function renderCart(){
    const el = document.getElementById('cart-list');
    el.innerHTML = '';
    let total = 0;
    cart.forEach(it => {
      total += it.qty * it.price;
      const row = document.createElement('div');
      row.innerHTML = `${it.name} x ${it.qty} = ${it.qty * it.price}`;
      el.appendChild(row);
    });
    const totEl = document.createElement('div');
    totEl.className = 'font-bold mt-2';
    totEl.innerText = 'Total: ' + total;
    el.appendChild(totEl);
  }

  function addToCart(prod){
    const existing = cart.find(i=>i.product_id==prod.id);
    if (existing) existing.qty++;
    else cart.push({product_id:prod.id, name:prod.name, price:prod.price, qty:1});
    renderCart();
  }

  document.getElementById('barcodeInput').addEventListener('keydown', async e=>{
    if (e.key==='Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (!val) return;
      const found = products.find(p=>p.sku===val);
      if (found) addToCart(found);
      else {
        // fallback: API lookup by SKU
        try {
          const res = await fetch('/api/products?sku='+encodeURIComponent(val));
          const list = await res.json();
          const p = Array.isArray(list) ? list.find(x=>x.sku==val) : list;
          if (p) addToCart(p);
          else alert('Product not found');
        } catch(err){ alert('Lookup failed'); }
      }
      e.target.value='';
    }
  });

  document.querySelectorAll('.product-card').forEach(p=>{
    p.addEventListener('click', ()=> addToCart({id:p.dataset.id, name:p.dataset.name, price:parseFloat(p.dataset.price)}));
  });

  document.getElementById('checkoutBtn').addEventListener('click', ()=>{
    const payment = parseFloat(document.getElementById('payment').value || 0);
    if (cart.length===0){ alert('Cart empty'); return; }
    document.getElementById('itemsInput').value = JSON.stringify(cart);
    document.getElementById('paymentInput').value = payment;
    document.getElementById('checkoutForm').submit();
  });
})();
</script>
@endpush
