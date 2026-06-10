'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([]);
  useEffect(() => {

  const updateCartCount = () => {

    const storedCart =
      JSON.parse(localStorage.getItem('cart') || '[]');

    window.dispatchEvent(
      new Event('cartUpdated')
    );

  };

  updateCartCount();

}, [cart]);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(storedCart);

    setCart(storedCart);

  }, []);
const total = cart.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
const arogyaProduct = cart.find(
  (item) => item.name === 'Arogya Churn'
);

const b12Product = cart.find(
  (item) => item.name === 'B12 Super Food'
);

const arogyaQuantity =
  arogyaProduct?.quantity || 0;

const b12Quantity =
  b12Product?.quantity || 0;

let deliveryCharge = cart.length > 0 ? 50 : 0;

if (
  arogyaQuantity >= 2 ||
  b12Quantity >= 2 ||
  (arogyaQuantity >= 1 && b12Quantity >= 1)
) {
  deliveryCharge = 0;
}

const finalTotal = total + deliveryCharge;

  return (

    <main className="min-h-screen bg-gradient-to-b from-[#fdfcf8] via-[#f8f4ec] to-[#f3eee3] p-4 md:p-10">
<h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#173926] mb-8 md:mb-12 tracking-tight text-center md:text-left">
        Your Cart
      </h1>

      <div className="grid gap-6">
{cart.length === 0 && (
  <div className="bg-white rounded-[30px] p-8 text-center border border-[#e7ebe7] shadow-lg">
    <h2 className="text-2xl font-black text-[#173926]">
      Your Cart Is Empty
    </h2>

    <p className="mt-3 text-[#66756d]">
      Add some products to continue shopping.
    </p>
  </div>
)}
        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 md:p-10 border border-[#e7ebe7] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500"
          >

            <h2 className="text-2xl md:text-3xl font-black text-[#173926]">
              {item.name}
            </h2>

            <p className="mt-4 text-[#c3955d] text-2xl font-black">
  ₹{item.price * (item.quantity || 1)}  
</p>

<div className="mt-5 flex flex-wrap items-center gap-2 md:gap-3">
  <button
    onClick={() => {

      const updatedCart = [...cart];
updatedCart[index].quantity =
  updatedCart[index].quantity || 1;
      updatedCart[index].quantity -= 1;

if (updatedCart[index].quantity <= 0) {

  updatedCart.splice(index, 1);

}

      setCart(updatedCart);

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(
  new Event('cartUpdated')
);

    }}

    className="w-12 h-12 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white text-xl transition-all duration-300"
  >
    -
  </button>
<span className="min-w-[40px] text-center text-2xl md:text-3xl font-black text-[#173926]">
    {item.quantity || 1}
  </span>

  <button
    onClick={() => {

      const updatedCart = [...cart];
updatedCart[index].quantity =
  updatedCart[index].quantity || 1;
      updatedCart[index].quantity += 1;

      setCart(updatedCart);

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(
  new Event('cartUpdated')
);

    }}

    className="w-12 h-12 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white text-xl transition-all duration-300"
  >
    +
  </button>

  <button
    onClick={() => {

      const updatedCart =
        cart.filter((_, i) => i !== index);

      setCart(updatedCart);

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(
  new Event('cartUpdated')
);

    }}

    className="ml-2 md:ml-5 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
  >
    Remove
  </button>

</div>
          </div>

        ))}

      </div>

      <div className="mt-10">

        <div className="bg-white rounded-[30px] md:rounded-[40px] p-5 md:p-10 border border-[#e7ebe7] shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-w-xl ml-auto">

  <div className="flex items-center justify-between border-b border-[#e5ebe7] pb-5">

    <p className="text-lg md:text-2xl font-semibold text-[#173926]">
      Subtotal
    </p>

    <p className="text-3xl font-black text-[#173926]">
      ₹{total}
    </p>

  </div>

  <div className="flex items-center justify-between py-5 border-b border-[#e5ebe7]">

    <p className="text-lg md:text-2xlfont-semibold text-[#173926]">
      Delivery Charges
    </p>

    <p className="text-lg md:text-2xl font-bold text-[#c3955d]">
      ₹{deliveryCharge}
    </p>

  </div>

  <div className="flex items-center justify-between pt-6">

    <p className="text-3xl font-black text-[#173926]">
      Final Total
    </p>

    <p className="text-3xl md:text-4xl font-black text-[#173926]">
      ₹{finalTotal}
    </p>

  </div>

</div>

      </div>
      <div className="mt-14 flex justify-center md:justify-end">

  <button
   onClick={() => {

  const email =
    localStorage.getItem(
      'customerEmail'
    );

  if (!email) {

    localStorage.setItem(
      'redirectAfterLogin',
      '/checkout'
    );

    window.location.href =
      '/account/login';

    return;
  }

  window.location.href =
    '/checkout';

}}

  className="w-full md:w-auto px-6 md:px-12 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-[#173926] to-[#28543c] hover:scale-105 text-white text-lg font-bold transition-all duration-300 shadow-[0_15px_40px_rgba(23,57,38,0.35)]">
    Proceed To Checkout
  </button>

</div>

    </main>

  );
}