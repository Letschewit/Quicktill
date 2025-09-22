import React, {useState, useEffect, useRef} from 'react';
import api, { getSettings } from '../api';
import Receipt from '../components/Receipt';

export default function POS(){
  const [barcode, setBarcode] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState('');
  const [lastSale, setLastSale] = useState(null);
  const [storeName, setStoreName] = useState('QuickTill');
  const [receiptFooter, setReceiptFooter] = useState('Thank you for your purchase!');
  const [logoUrl, setLogoUrl] = useState(null);
  const receiptRef = useRef(null);

  useEffect(()=> {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
    getSettings().then(res => {
      if (res.data.store_name) setStoreName(res.data.store_name);
      if (res.data.receipt_footer) setReceiptFooter(res.data.receipt_footer);
      if (res.data.logo_url) setLogoUrl(res.data.logo_url);
    }).catch(()=>{});
  },[]);

  function addToCart(prod){
    setCart(prev => {
      const t = [...prev];
      const idx = t.findIndex(i=>i.product_id===prod.id);
      if (idx>=0) t[idx].qty += 1;
      else t.push({product_id: prod.id, sku: prod.sku, name: prod.name, price: prod.price, qty:1});
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
      const res = await api.post('/pos/checkout', {items: cart, payment: parseFloat(payment)});
      alert('Sale recorded. Change: ' + res.data.change);
      setLastSale({
        sale_id: res.data.sale_id,
        total: res.data.total,
        change: res.data.change,
        payment: parseFloat(payment),
        items: cart,
        date: new Date().toISOString(),
        cashier: JSON.parse(localStorage.getItem('user')||'{}').name || 'Unknown'
      });
      setCart([]); setPayment('');
    } catch(err){ console.error(err); alert('Checkout failed'); }
  }

  const total = cart.reduce((s,i)=> s + i.qty*i.price, 0);
  const payNum = parseFloat(payment || '0');
  const changePreview = isNaN(payNum) ? 0 : payNum - total;

  function handlePrint(){
    if (!lastSale) { alert('No receipt to print'); return; }
    window.print();
  }

  return (
    <div className="container">
      <div className="page-content">
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Point of Sale</h1>
          <div className="card mb-6">
            <div className="form-group">
              <label className="form-label">Scan or Enter SKU</label>
              <input
                placeholder="Scan barcode or enter SKU"
                value={barcode}
                onChange={e=>setBarcode(e.target.value)}
                onKeyDown={handleScanKey}
                className="form-input"
                autoFocus
                style={{ fontSize: '1.2rem', textAlign: 'center' }}
              />
            </div>
          </div>

          <div className="flex gap-6" style={{ alignItems: 'stretch' }}>
            <div className="flex-2">
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ border: 'none', marginBottom: '1.5rem' }}>Products</h3>
                <div className="grid grid-3">
                  {products.map(p => (
                    <div 
                      key={p.id} 
                      onClick={()=>addToCart(p)} 
                      className="card product-card"
                      style={{ 
                        textAlign: 'center',
                        border: '2px solid var(--border-color)'
                      }}
                    >
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {p.name}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        SKU: {p.sku}
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>
                        Rp {p.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="card">
                <h3 style={{ border: 'none', marginBottom: '1.5rem' }}>Shopping Cart</h3>
                
                {(cart.length === 0 && !lastSale) ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    Cart is empty
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                    {/* Left: cart + checkout controls */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {cart.length > 0 && (
                        <>
                          <div style={{ marginBottom: '1rem' }}>
                            {cart.map((it, idx)=>(
                              <div 
                                key={idx} 
                                className="cart-item"
                                style={{ 
                                  padding: '0.75rem', 
                                  borderBottom: '1px solid var(--border-color)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <div>
                                  <div style={{ fontWeight: '600' }}>{it.name}</div>
                                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Qty: {it.qty} × Rp {it.price.toLocaleString()}
                                  </div>
                                </div>
                                <div style={{ fontWeight: '600' }}>
                                  Rp {(it.qty * it.price).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div 
                            style={{ 
                              padding: '1rem', 
                              backgroundColor: 'var(--secondary-white)', 
                              border: '2px solid var(--primary-black)',
                              marginBottom: '1rem',
                              textAlign: 'center'
                            }}
                          >
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                              TOTAL
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                              Rp {total.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Payment Amount</label>
                            <input 
                              value={payment} 
                              onChange={e=>setPayment(e.target.value)} 
                              placeholder="Enter payment amount" 
                              className="form-input"
                              style={{ fontSize: '1.2rem', textAlign: 'center' }}
                            />
                          </div>
                          
                          <button 
                            onClick={checkout} 
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                          >
                            Process Checkout
                          </button>
                        </>
                      )}

                      {/* If no items but we have a lastSale, show a small note */}
                      {cart.length === 0 && lastSale && (
                        <div style={{ color: 'var(--text-secondary)' }}>
                          Last sale displayed at right.
                        </div>
                      )}
                    </div>

                    {/* Right: final receipt side panel */}
                    {lastSale && (
                      <div style={{ width: 320, flex: '0 0 auto' }}>
                        <h4 style={{ margin: 0, marginBottom: '0.75rem' }}>Receipt</h4>
                        <div ref={receiptRef}>
                          <Receipt
                            storeName={storeName}
                            footer={receiptFooter}
                            logoUrl={logoUrl}
                            saleId={lastSale.sale_id}
                            cashier={lastSale.cashier}
                            date={lastSale.date}
                            items={lastSale.items}
                            total={lastSale.total}
                            payment={lastSale.payment}
                            change={lastSale.change}
                          />
                        </div>
                        <div style={{ marginTop: '0.75rem' }}>
                          <button className="btn" onClick={handlePrint}>Print Receipt</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Live receipt preview */}
              {cart.length > 0 && (
                <div className="card mt-4">
                  <h3 style={{ border: 'none', marginBottom: '1rem' }}>Receipt Preview</h3>
                  <Receipt
                    storeName={storeName}
                    footer={receiptFooter}
                    logoUrl={logoUrl}
                    saleId={'PREVIEW'}
                    cashier={JSON.parse(localStorage.getItem('user')||'{}').name || 'Unknown'}
                    date={new Date().toISOString()}
                    items={cart}
                    total={total}
                    payment={isNaN(payNum) ? 0 : payNum}
                    change={isNaN(payNum) ? 0 : Math.max(changePreview, 0)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile checkout bar */}
      {cart.length > 0 && (
        <div className="mobile-only mobile-checkout-bar">
          <div style={{ fontWeight: 700 }}>Rp {total.toLocaleString()}</div>
          <button className="btn btn-primary" onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
