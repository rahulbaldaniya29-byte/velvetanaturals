'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { couponService } from '@/services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
  const { items, removeItem, updateQty, total, subtotal, discountAmount, coupon, applyCoupon, removeCoupon, itemCount } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const { data } = await couponService.validate(couponCode.trim().toUpperCase(), subtotal);
      applyCoupon(couponCode.toUpperCase(), data.discount);
      toast.success(`Coupon applied! ${data.discount}% off`);
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Invalid coupon');
    } finally { setCouponLoading(false); }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest/50 backdrop-blur-sm z-[200]"
            onClick={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }} animate={{ x: cartOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#fdfcf8] z-[201] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-pale/30">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green" strokeWidth={1.5} />
            <span className="font-serif text-xl text-forest">Your Cart</span>
            {itemCount > 0 && <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center">{itemCount}</span>}
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-green-pale/30 transition-colors">
            <X size={20} className="text-muted" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-green-pale/30 flex items-center justify-center">
                <ShoppingBag size={32} className="text-green-pale" strokeWidth={1} />
              </div>
              <p className="font-serif text-lg text-forest">Your cart is empty</p>
              <p className="text-sm text-muted">Discover our Ayurvedic wellness products</p>
              <Link href="/shop" onClick={() => setCartOpen(false)} className="btn-primary mt-2">Shop Now</Link>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div key={item._id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-4 p-3 rounded-2xl bg-cream/60 border border-green-pale/20">
                  <div className="relative w-16 h-18 rounded-xl bg-white flex-shrink-0 overflow-hidden">
                    <Image src={item.image || '/product-placeholder.png'} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-forest truncate">{item.name}</p>
                    <p className="text-xs text-green font-medium mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-7 h-7 rounded-full border border-green-pale flex items-center justify-center hover:bg-green hover:text-white hover:border-green transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item._id, item.qty + 1)} disabled={item.qty >= item.stock} className="w-7 h-7 rounded-full border border-green-pale flex items-center justify-center hover:bg-green hover:text-white hover:border-green transition-colors disabled:opacity-40">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <p className="text-sm font-medium text-forest">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-green-pale/30 space-y-4">
            {/* Coupon */}
            {coupon ? (
              <div className="flex items-center justify-between p-3 bg-green/10 rounded-2xl border border-green/20">
                <span className="text-xs font-medium text-green">🏷️ {coupon.code} — {coupon.discount}% off</span>
                <button onClick={removeCoupon} className="text-xs text-muted hover:text-red-400 transition-colors">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon code" className="input-field flex-1 !py-2 !text-xs" />
                <button onClick={handleApplyCoupon} disabled={couponLoading} className="px-4 py-2 rounded-xl bg-forest text-white text-xs tracking-wider font-medium hover:bg-green transition-colors disabled:opacity-60">
                  {couponLoading ? '…' : 'Apply'}
                </button>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-green">
                  <span>Discount</span><span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-muted">
                <span>Shipping</span><span className="text-green">Free</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-green-pale/30">
                <span className="text-sm font-medium text-forest">Total</span>
                <span className="font-serif text-2xl text-forest">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full justify-center">
              Proceed to Checkout
            </Link>
            <button onClick={() => setCartOpen(false)} className="w-full text-center text-xs text-muted hover:text-forest transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}