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

    <main className="min-h-screen bg-[#fdfcf8] p-5 md:p-10">

      <h1 className="text-3xl md:text-5xl font-black text-[#173926] mb-10">
        Your Cart
      </h1>

      <div className="grid gap-6">

        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[30px] p-5 md:p-8 shadow-xl border border-[#e5ebe7]"
          >

            <h2 className="text-2xl font-bold text-[#173926]">
              {item.name}
            </h2>

            <p className="mt-3 text-[#5a685f] text-lg">
  ₹{item.price * (item.quantity || 1)}  
</p>

<div className="mt-5 flex flex-wrap items-center gap-3">

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

    className="w-10 h-10 rounded-full bg-[#173926] text-white text-xl"
  >
    -
  </button>

  <span className="text-2xl font-bold text-[#173926]">
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

    className="w-10 h-10 rounded-full bg-[#173926] text-white text-xl"
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

    className="ml-5 px-5 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
  >
    Remove
  </button>

</div>
          </div>

        ))}

      </div>

      <div className="mt-10">

        <div className="bg-white rounded-[30px] p-5 md:p-8 shadow-xl border border-[#e5ebe7] max-w-xl ml-auto">

  <div className="flex items-center justify-between border-b border-[#e5ebe7] pb-5">

    <p className="text-2xl font-semibold text-[#173926]">
      Subtotal
    </p>

    <p className="text-2xl font-bold text-[#173926]">
      ₹{total}
    </p>

  </div>

  <div className="flex items-center justify-between py-5 border-b border-[#e5ebe7]">

    <p className="text-2xl font-semibold text-[#173926]">
      Delivery Charges
    </p>

    <p className="text-2xl font-bold text-[#c3955d]">
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

      localStorage.setItem(
        'checkoutCart',
        JSON.stringify(cart)
      );

      window.location.href = '/checkout';

    }}

    className="px-6 md:px-10 py-4 md:py-5 rounded-full bg-[#173926] hover:bg-[#28543c] text-white text-lg font-semibold transition-all duration-300 shadow-xl hover:scale-105"
  >
    Proceed To Checkout
  </button>

</div>

    </main>

  );
}