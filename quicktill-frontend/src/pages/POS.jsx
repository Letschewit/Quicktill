import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function POS(){
  const [barcode, setBarcode] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState('');

  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  },[]);

  function addToCart(prod){
    setCart(prev => {
      const t = [...prev];
      const idx = t.findIndex(i=>i.product_id===prod.id);
      if (idx>=0) t[idx].qty += 1;
      else t.push({product_id: prod.id, name: prod.name, price: prod.price, qty:1});
      return t;
    });
  }

  async function handleScanKey(e){
    if (e.key === 'Enter') {
      const code = barcode.trim(); setBarcode('');
      if (!code) return;
      const found = products.find(p => p.sku === code);
      if (found) addToCart(found);
      else alert('Product not found');
    }
  }

  async function checkout(){
    if (cart.length===0){ alert('Cart empty'); return; }
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/checkout', {items: cart, payment: parseFloat(payment)});
      alert('Sale recorded. Change: ' + res.data.change);
      setCart([]); setPayment('');
      // optionally redirect to receipt or fetch sale details
    } catch(err){ console.error(err); alert('Checkout failed'); }
  }

  const total = cart.reduce((s,i)=> s + i.qty*i.price, 0);

  return (
    <div style={{padding:20}}>
      <h1>QuickTill POS (React)</h1>
      <input
        placeholder="Scan SKU"
        value={barcode}
        onChange={e=>setBarcode(e.target.value)}
        onKeyDown={handleScanKey}
        style={{width:'100%',padding:8,marginBottom:8}}
        autoFocus
      />
      <div style={{display:'flex',gap:20}}>
        <div style={{flex:2}}>
          <h3>Products</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {products.map(p => (
              <div key={p.id} onClick={()=>addToCart(p)} style={{border:'1px solid #ddd',padding:8,cursor:'pointer'}}>
                <strong>{p.name}</strong><div>{p.sku}</div><div>Rp {p.price}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{flex:1}}>
          <h3>Cart</h3>
          {cart.map((it, idx)=>(
            <div key={idx}>{it.name} x {it.qty} = {it.qty*it.price}</div>
          ))}
          <div style={{marginTop:8}}>Total: {total}</div>
          <input value={payment} onChange={e=>setPayment(e.target.value)} placeholder="Payment" style={{width:'100%',marginTop:8,padding:6}} />
          <button onClick={checkout} style={{width:'100%',marginTop:8,padding:8}}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
