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


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [pincode, setPincode] = useState('');

  const [landmark, setLandmark] = useState('');
const [stateName, setStateName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [email, setEmail] = useState('');

  const totalQuantity = cart.reduce(
  (acc, item) => acc + item.quantity,
  0
);
let deliveryCharge = 0;

if (cart.length > 0) {

  deliveryCharge =
    totalQuantity >= 2 ? 0 : 50;

}

const subtotal = cart.reduce(
  (acc, item) =>
    acc + item.price * item.quantity,
  0
);

const totalAmount =
  subtotal + deliveryCharge;
  useEffect(() => {

  const storedCart =
    JSON.parse(
      localStorage.getItem('checkoutCart') || '[]'
    );

  if (storedCart.length === 0) {

    window.location.href = '/cart';

    return;

  }

  setCart(storedCart);

}, []);
  const handlePayment = async () => {
    if (cart.length === 0) {

  setWarning('Cart is empty 😄');

  return;

}
    if (
  !name ||
  !phone ||
  !address ||
  !city ||
  !landmark ||
  !stateName ||
  !pincode
) {

  setWarning('Please fill all delivery details 😄');

  return;

}

if (phone.length < 10) {

  setWarning('Enter valid phone number 😄');

  return;

}
if (
  !email.includes('@') ||
  !email.includes('.')
) {

  setWarning('Enter valid email 😄');

  return;

}

if (pincode.length < 6) {

  setWarning('Enter valid pincode 😄');

  return;

}

setWarning('');
    

    const options = {

      key: "rzp_test_SsH2DYkn4YrvhB",

      amount: totalAmount * 100,

      currency: "INR",

      name: "Velveta Naturals",

      description: 'Velveta Naturals Order',


      handler: async function (response: any) {
        setLoading(true);

        await supabase
          .from('orders')
          .insert([
            {
              product_name: cart
  .map((item) => item.name)
  .join(', '),
              amount: totalAmount,
              quantity: cart.reduce(
  (acc, item) => acc + item.quantity,
  0
),
              customer_name: name,
              customer_phone: phone,
              customer_email: email,
              customer_address: address,
              customer_city: city,
              customer_landmark: landmark,
customer_state: stateName,
              customer_pincode: pincode,
              payment_id: response.razorpay_payment_id,
              order_date: new Date().toLocaleDateString('en-IN'),
            }
          ]);
          await fetch('/api/send-email', {

  method: 'POST',

  headers: {
    'Content-Type': 'application/json',
  },

  body: JSON.stringify({
    email,
    name,
    amount: totalAmount,
  }),

});
        localStorage.removeItem('cart');

localStorage.removeItem('checkoutCart');
          window.location.href = '/success';
      },

      theme: {
        color: "#173926",
      },

    };

    const rzp = new window.Razorpay(options);

    rzp.open();

  };

  

  return (
<main className="min-h-screen bg-[#f7f5ef] py-20 px-6 pb-40 md:pb-20">
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 animate-[fadeInUp_0.8s_ease-out]">

        {/* PRODUCT */}
        <div className="bg-white rounded-[35px] p-5 md:p-10 shadow-xl">

          <div className="space-y-6">

  {cart.map((item, index) => (

    <div
      key={index}
      className="flex flex-col sm:flex-row items-center gap-5 bg-[#f7f5ef] p-5 rounded-3xl"
    >

      <Image
        src={
          item.name === 'Arogya Churn'
            ? '/product1.jpeg'
            : '/product2.jpeg'
        }
        alt={item.name}
        width={90}
        height={90}
        className="rounded-2xl"
      />

      <div className="flex-1">

        <h2 className="text-xl md:text-2xl font-bold text-[#173926]">
          {item.name}
        </h2>

        <div className="mt-3 flex items-center justify-between">


  <div className="flex items-center gap-4">

  <button
    onClick={() => {

      const updatedCart = [...cart];

      updatedCart[index].quantity -= 1;

      if (updatedCart[index].quantity <= 0) {

        updatedCart.splice(index, 1);

      }

      setCart(updatedCart);

      localStorage.setItem(
        'checkoutCart',
        JSON.stringify(updatedCart)
      );

    }}
    className="w-9 h-9 rounded-full bg-[#173926] text-white"
  >
    -
  </button>

  <span className="text-xl font-bold text-[#173926]">
    {item.quantity}
  </span>

  <button
    onClick={() => {

      const updatedCart = [...cart];

      updatedCart[index].quantity += 1;

      setCart(updatedCart);

      localStorage.setItem(
        'checkoutCart',
        JSON.stringify(updatedCart)
      );

    }}
    className="w-9 h-9 rounded-full bg-[#173926] text-white"
  >
    +
  </button>

</div>

</div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-[#c3955d]">
        ₹{item.price * item.quantity}
      </h3>

    </div>

  ))}

</div>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#c3955d]">
            ₹{totalAmount}
          </h2>
          <div className="mt-8 bg-[#f7f5ef] rounded-3xl p-6 space-y-4">
  

  <div className="flex items-center justify-between text-lg">
    <span className="text-[#5a685f]">
      Subtotal
    </span>

    <span className="font-semibold text-[#173926]">
      ₹{subtotal}
    </span>
  </div>

  <div className="flex items-center justify-between text-lg">
    <span className="text-[#5a685f]">
      Delivery Charges
    </span>

    <span className="font-semibold text-[#173926]">
      ₹{deliveryCharge}
    </span>
  </div>

  <div className="border-t border-[#dfe7e1] pt-4 flex items-center justify-between">

    <span className="text-xl md:text-2xl font-bold text-[#173926]">
      Total
    </span>

    <span className="text-2xl md:text-3xl font-black text-[#173926]">
      ₹{totalAmount}
    </span>

  </div>

</div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-[35px] p-5 md:p-10 shadow-xl">

          <h2 className="text-2xl md:text-3xl font-bold text-[#173926] mb-8">
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
            <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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
  placeholder="Landmark"
  value={landmark}
  onChange={(e) => setLandmark(e.target.value)}
  className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
/>

<input
  type="text"
  placeholder="State"
  value={stateName}
  onChange={(e) => setStateName(e.target.value)}
  className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
/>
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />
{warning && (

  <div className="bg-red-100 border border-red-300 text-red-600 px-5 py-4 rounded-2xl text-center font-semibold">

    {warning}

  </div>

)}
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