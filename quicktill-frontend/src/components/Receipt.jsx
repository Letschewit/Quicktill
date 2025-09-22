import React from "react";

export default function Receipt({ storeName = "QuickTill", saleId, cashier, date, items, total, payment, change, footer = "Thank you for your purchase!", logoUrl = null }) {
  return (
    <div className="receipt" style={{ width: '80mm', padding: '8mm', color: '#000', background: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        {logoUrl && (
          <div style={{ marginBottom: '6px' }}>
            <img src={logoUrl} alt="Logo" style={{ maxWidth: '48mm', maxHeight: 56 }} />
          </div>
        )}
        <div style={{ fontWeight: 700, fontSize: '18px' }}>{storeName}</div>
        <div style={{ fontSize: '12px' }}>Receipt</div>
      </div>

      <div style={{ fontSize: '12px', marginBottom: '8px' }}>
        <div>Sale ID: #{saleId}</div>
        <div>Cashier: {cashier}</div>
        <div>{new Date(date).toLocaleString()}</div>
      </div>

      <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '8px 0', marginBottom: '8px' }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 600 }}>{it.name}</div>
              <div>Rp {(it.price * it.qty).toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <div>SKU: {it.sku || it.product_id}</div>
              <div>{it.qty} × Rp {it.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '13px', marginBottom: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 700 }}>TOTAL</div>
          <div style={{ fontWeight: 700 }}>Rp {total.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Payment</div>
          <div>Rp {payment.toLocaleString()}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Change</div>
          <div>Rp {change.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px' }}>
        {footer}
      </div>
    </div>
  );
} 