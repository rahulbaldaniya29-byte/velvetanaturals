'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

import { supabase } from '@/lib/supabase';

import {
  Package,
  Truck,
  Bike,
  CheckCircle,
  Copy
} from 'lucide-react';
import { Download } from 'lucide-react';

export default function OrdersPage() {
const router = useRouter();

  const [customerEmail, setCustomerEmail] =
  useState('');
  const [copied, setCopied] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const statusSteps = [
  'Packed',
  'Shipped',
  'Out For Delivery',
  'Delivered',
];
const downloadInvoice = (order: any) => {

  const doc = new jsPDF();

  doc.setFontSize(24);

  doc.text('Velveta Naturals', 20, 20);

  doc.setFontSize(14);

  doc.text('Invoice', 20, 35);

  doc.text(`Product: ${order.product_name}`, 20, 55);

  doc.text(`Amount: Rs. ${order.amount}`, 20, 70);

  doc.text(`Customer: ${order.customer_name}`, 20, 85);

  doc.text(`Phone: ${order.customer_phone}`, 20, 100);

  doc.text(`Address: ${order.customer_address}`, 20, 115);

  doc.text(`Status: ${order.status}`, 20, 130);

  doc.text(`Date: ${order.order_date}`, 20, 145);

  doc.text(`Payment ID: ${order.payment_id}`, 20, 160);
  doc.text(`Order ID: ${order.order_id}`, 20, 40);

  doc.save(`invoice-${order.id}.pdf`);

};

  const fetchOrders = async (
  email: string
) => {

  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq(
      'customer_email',
      email
    )
    .order('id', {
      ascending: false,
    });

  if (data) {
    setOrders(data);
  }

};
useEffect(() => {

  const email =
    localStorage.getItem(
      'customerEmail'
    );

  if (!email) {

    window.location.href =
      '/account/login';

    return;

  }

  setCustomerEmail(email);

  fetchOrders(email);

}, []);
  useEffect(() => {

  const delivered = orders.some(
    (order) => order.status === 'Delivered'
  );

  if (
    delivered &&
    typeof window !== 'undefined' &&
    (window as any).confetti
  ) {
    (window as any).confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  }

}, [orders]);

return (
  <>
    <Script
      src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
      strategy="afterInteractive"
    />

    <main className="min-h-screen bg-[#fdfcf8] px-6 py-20">
      {copied && (
  <div
    className="
      fixed
      top-5
      right-5
      bg-[#173926]
      text-white
      px-5
      py-3
      rounded-2xl
      shadow-2xl
      z-50
      font-semibold
    "
  >
    {copied}
  </div>
)}

      <div className="max-w-7xl mx-auto">

  <div className="flex justify-end mb-4">
    <button
      onClick={async () => {

  await fetch('/api/logout', {
    method: 'POST',
  });

  localStorage.removeItem(
    'customerEmail'
  );

  router.push('/account/login');

}}
      className="
        px-5
        py-2
        rounded-xl
        bg-red-600
        hover:bg-red-700
        text-white
        font-semibold
      "
    >
      Logout
    </button>
  </div>

  <div className="text-center">

          <h1 className="text-3xl md:text-5xl font-black text-[#173926]">
            My Orders
          </h1>

        <p className="mt-5 text-[#5a685f] text-lg">
  View and track all your orders
</p>

        </div>

        <div className="mt-10 grid gap-6">
          {orders.length === 0 && (

  <div className="
    bg-white
    rounded-3xl
    p-10
    text-center
    shadow-xl
  ">
    <h2 className="
      text-2xl
      font-bold
      text-[#173926]
    ">
      No Orders Found
    </h2>

    <p className="
      mt-3
      text-gray-500
    ">
      You have not placed any orders yet.
    </p>
  </div>

)}
          {orders.map((order) => (

            <div
  key={order.id}
  className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-[#e5ebe7]"
>

<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                <div>

                  <h2 className="text-2xl md:text-3xl font-bold text-[#173926]">
                    {order.product_name}
                  </h2>
<div className="flex items-center gap-2 mt-2">

  <p className="text-[#5a685f] font-semibold">
    Order ID: {order.order_id}
  </p>

  <button
  title="Copy Order ID"
  aria-label="Copy Order ID"
  onClick={() => {

    navigator.clipboard.writeText(order.order_id);

    setCopied('Order ID Copied ✓');

    setTimeout(() => {
      setCopied('');
    }, 2000);

  }}
  className="
    p-1
    rounded-lg
    text-[#6b7280]
    hover:bg-gray-100
    hover:text-[#173926]
    transition-all
  "
>
  <Copy size={22} />
</button>

</div>
                  <p className="mt-3 text-[#c3955d] text-2xl font-bold">
                    ₹{order.amount}
                  </p>

                </div>

              <div className="flex justify-center">
  <div
    className={`px-10 py-4 rounded-full text-white font-bold shadow-lg ${
      order.status === 'Packed'
        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
        : order.status === 'Shipped'
        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
        : order.status === 'Out For Delivery'
        ? 'bg-gradient-to-r from-orange-500 to-red-500'
        : 'bg-gradient-to-r from-green-700 to-emerald-900'
    }`}
  >
    {order.status}
  </div>
</div>

<div className="
  text-center
  md:text-right
  border-t
  md:border-t-0
  md:border-l
  border-gray-200
  pt-4
  md:pt-0
  md:pl-8
">

  <p className="text-gray-500 text-lg">
    🕒 Last Updated:
  </p>

  <p className="mt-2 text-[#173926] text-xl font-semibold">
  {order.status_updated_at
    ? new Date(order.status_updated_at).toLocaleString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      )
    : order.order_date}
</p>

</div>

              </div>
<div className="mt-10 border-t pt-8">

  <div className="overflow-x-auto">
  <div className="grid grid-cols-4 gap-8 text-center min-w-[700px]">

    {statusSteps.map((step, index) => {

      const currentStep =
        statusSteps.indexOf(order.status);

      const completed =
        currentStep >= index;

      return (

        <div key={step} className="relative">

          <div
            className={`
              w-16 h-16 md:w-24 md:h-24 mx-auto
              rounded-[28px]
              flex items-center justify-center
              text-4xl
              ${
                completed
                  ? 'bg-[#173926] text-white'
                  : 'bg-[#c8ccd4] text-white'
              }
            `}
          >
            {step === 'Packed' ? (
  <Package size={40} />
) : step === 'Shipped' ? (
  <Truck size={40} />
) : step === 'Out For Delivery' ? (
  <Bike size={40} />
) : (
  <CheckCircle size={40} />
)}
          </div>

<h3
  className="
    mt-5
    text-lg
    md:text-xl
    font-bold
    text-[#173926]
    min-h-[60px]
    flex
    items-center
    justify-center
    text-center
  "
>
  {step}
</h3>
          <p className="text-gray-500">
            {completed ? 'Completed' : 'Pending'}
          </p>

          {step === 'Packed' && completed && (
  <p className="mt-2 text-gray-500 text-sm">
    {order.status_updated_at
      ? new Date(order.status_updated_at).toLocaleString(
          'en-IN',
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        )
      : order.order_date}
  </p>
)}

        </div>

      );

    })}
</div>
  </div>

</div>
              <div className="mt-8 grid md:grid-cols-2 gap-6">

                <div className="bg-[#f7f5ef] p-6 rounded-3xl min-h-[180px]">

                  <p className="text-sm text-[#5a685f]">
                    Delivery Address
                  </p>

                  <p className="mt-2 text-[#173926] font-semibold">
                    {order.customer_address}
                  </p>

                </div>

                <div className="bg-[#f7f5ef] p-6 rounded-3xl min-h-[180px]">

  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

    <div>

      <p className="text-sm text-[#5a685f]">
        Ordered Date
      </p>

      <p className="mt-2 text-[#173926] font-semibold">
        {order.order_date
          ? order.order_date
          : 'Date Not Available'}
      </p>

    </div>

    <button
      onClick={() => downloadInvoice(order)}
      className="
      w-full md:w-auto
  justify-center
  px-5
  py-3
  rounded-2xl
  bg-[#173926]
  hover:bg-[#28543c]
  text-white
  font-semibold
  transition-all
  duration-300
  flex
  items-center
  gap-2
" 
    >
       <Download size={18} />
      Download Invoice
    </button>

  </div>

</div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  </>
);

}