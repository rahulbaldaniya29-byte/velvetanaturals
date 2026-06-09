'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Script from 'next/script';

import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';

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

doc.setFillColor(23, 57, 38);
doc.rect(0, 0, 210, 35, 'F');

doc.setTextColor(255, 255, 255);
doc.setFontSize(26);
doc.text('VELVETA NATURALS', 20, 22);

doc.setFontSize(11);
doc.text(
  'Premium Ayurvedic & Natural Products',
  20,
  30
);

doc.setTextColor(0, 0, 0);

doc.setFontSize(22);
doc.text('INVOICE', 150, 55);

doc.setFontSize(11);
doc.text(
  `Order ID: ${order.order_id}`,
  20,
  50
);

doc.text(
  `Date: ${order.order_date}`,
  20,
  58
);

doc.roundedRect(
  15,
  70,
  180,
  45,
  4,
  4
);

doc.setFontSize(13);
doc.text(
  'Customer Details',
  20,
  82
);

doc.setFontSize(11);

doc.text(
  `Name: ${order.customer_name}`,
  20,
  94
);

doc.text(
  `Phone: ${order.customer_phone}`,
  20,
  102
);

doc.text(
  `Address: ${order.customer_address}`,
  20,
  110
);

doc.setFillColor(23, 57, 38);

doc.rect(
  15,
  130,
  180,
  12,
  'F'
);

doc.setTextColor(255,255,255);

doc.text('Product', 20, 138);

doc.text('Amount', 160, 138);

doc.setTextColor(0,0,0);

doc.rect(
  15,
  142,
  180,
  18
);

doc.text(
  order.product_name,
  20,
  153
);

doc.text(
  `Rs. ${order.amount}`,
  160,
  153
);

doc.setFontSize(16);

doc.text(
  `Grand Total: Rs. ${order.amount}`,
  120,
  185
);

doc.text(
  `Status: ${order.status}`,
  20,
  185
);

doc.line(
  15,
  250,
  195,
  250
);

doc.setFontSize(10);

doc.text(
  'Thank you for shopping with Velveta Naturals',
  20,
  260
);

doc.text(
  'www.velvetanaturals.com',
  20,
  268
);

doc.save(
  `invoice-${order.order_id}.pdf`
);

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
    
  </div>

  <div className="text-center">
<p className="text-[#c3955d] font-bold tracking-[3px] uppercase mb-3">
  Order Dashboard
</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#173926] tracking-tight">
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
    <div className="text-7xl mb-4">
  📦
</div>
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
    <a
  href="/"
  className="inline-block mt-6 px-8 py-4 rounded-3xl bg-gradient-to-r from-[#173926] to-[#28543c] text-white font-semibold shadow-xl hover:scale-105 transition-all"
>
  Start Shopping
</a>
  </div>
  

)}
          {orders.map((order) => (

            <div
  key={order.id}
  className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-[#e5ebe7] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
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
    className={`px-10 py-4 rounded-full text-white font-bold shadow-2xl tracking-wide ${
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
{index !== statusSteps.length - 1 && (
  <div
    className={`absolute top-8 md:top-12 left-[60%] w-full h-2 rounded-full ${
      completed
        ? 'bg-gradient-to-r from-[#173926] via-[#28543c] to-[#c3955d]'
        : 'bg-gray-200'
    }`}
  />
)}
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

                <div className="bg-[#f7f5ef] p-6 rounded-3xl min-h-[180px] border border-[#e5ebe7]">

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
      className="w-full md:w-auto justify-center px-6 py-3 rounded-3xl bg-gradient-to-r from-[#173926] to-[#28543c] text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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