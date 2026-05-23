'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {

  const [product, setProduct] = useState<any>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const deliveryCharge = quantity >= 2 ? 0 : 50;

const totalAmount =
  (product?.price || 0) * quantity + deliveryCharge;


  useEffect(() => {

    const data = localStorage.getItem('selectedProduct');

    if (data) {
      setProduct(JSON.parse(data));
    }

  }, []);

  const handlePayment = async () => {
    setLoading(true);

    const options = {

      key: "rzp_test_SsH2DYkn4YrvhB",

      amount: totalAmount * 100,

      currency: "INR",

      name: "Velveta Naturals",

      description: product.name,

      image: product.image,

      handler: async function (response: any) {

        await supabase
          .from('orders')
          .insert([
            {
              product_name: product.name,
              amount: totalAmount,
              quantity: quantity,
              customer_name: name,
              customer_phone: phone,
              customer_address: address,
              customer_city: city,
              customer_pincode: pincode,
              payment_id: response.razorpay_payment_id,
            }
          ]);

        window.location.href = '/success';
      },

      theme: {
        color: "#173926",
      },

    };

    const rzp = new window.Razorpay(options);

    rzp.open();

  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] py-20 px-6">
      <style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 animate-[fadeInUp_0.8s_ease-out]">

        {/* PRODUCT */}
        <div className="bg-white rounded-[35px] p-10 shadow-xl">

          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={350}
            className="mx-auto transition-all duration-500 hover:scale-110"
          />

          <h1 className="mt-8 text-4xl font-bold text-[#173926]">
            {product.name}
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-[#c3955d]">
            ₹{totalAmount}
          </h2>
          <div className="mt-8 bg-[#f7f5ef] rounded-3xl p-6 space-y-4">
  

  <div className="flex items-center justify-between text-lg">
    <span className="text-[#5a685f]">
      Subtotal
    </span>

    <span className="font-semibold text-[#173926]">
      ₹{product.price * quantity}
    </span>
  </div>

  <div className="flex items-center justify-between text-lg">
    <span className="text-[#5a685f]">
      Delivery Charges
    </span>

    <span className="font-semibold text-[#173926]">
      {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
    </span>
  </div>

  <div className="border-t border-[#dfe7e1] pt-4 flex items-center justify-between">

    <span className="text-2xl font-bold text-[#173926]">
      Total
    </span>

    <span className="text-3xl font-black text-[#173926]">
      ₹{totalAmount}
    </span>

  </div>

</div>


          <div className="mt-8 flex items-center gap-5">

  <button
    onClick={() => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }}
    className="w-12 h-12 rounded-full bg-[#173926] text-white text-2xl"
  >
    -
  </button>

  <span className="text-3xl font-bold text-[#173926]">
    {quantity}
  </span>

  <button
    onClick={() => {
      setQuantity(quantity + 1);
    }}
    className="w-12 h-12 rounded-full bg-[#173926] text-white text-2xl"
  >
    +
  </button>

</div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-[35px] p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-[#173926] mb-8">
            Delivery Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <button
              onClick={handlePayment}
              className="w-full md:w-full fixed md:static bottom-4 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-50 md:z-auto max-w-[90%] md:max-w-full py-5 rounded-2xl bg-[#173926] hover:bg-[#28543c] hover:scale-[1.02] active:scale-[0.98] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}