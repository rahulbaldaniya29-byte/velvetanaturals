'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }

  }

  return (

    <main className="min-h-screen bg-[#f7f5ef] p-10">

     <div className="flex items-center justify-between mb-10">

  <div>
    <h1 className="text-5xl font-black text-[#173926]">
      Velveta Admin
    </h1>

    <p className="mt-3 text-[#5a685f] text-lg">
      Manage Orders & Customers
    </p>
  </div>

  <div className="bg-[#173926] text-white px-6 py-4 rounded-3xl">
    <h2 className="text-3xl font-bold">
      {orders.length}
    </h2>

    <p className="text-white/70 text-sm">
      Total Orders
    </p>
  </div>

</div>

      <div className="grid gap-6">

        {orders.map((order) => (

<div
  key={order.id}
  className="bg-white rounded-[30px] p-8 shadow-xl border border-[#e5ebe7]"
>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    <div>

      <h2 className="text-3xl font-bold text-[#173926]">
        {order.product_name}
      </h2>

      <p className="mt-2 text-[#c3955d] text-2xl font-bold">
        ₹{order.amount}
      </p>
      <p className="mt-2 text-[#5a685f] text-lg">
  Quantity: {order.quantity}
</p>

    </div>

    <div className="grid md:grid-cols-2 gap-6 flex-1">

      <div>
        <p className="text-sm text-[#5a685f]">
          Customer Name
        </p>

        <h3 className="text-xl font-semibold text-[#173926]">
          {order.customer_name}
        </h3>
      </div>

      <div>
        <p className="text-sm text-[#5a685f]">
          Phone
        </p>

        <h3 className="text-xl font-semibold text-[#173926]">
          {order.customer_phone}
        </h3>
      </div>

      <div>
        <p className="text-sm text-[#5a685f]">
          City
        </p>

        <h3 className="text-xl font-semibold text-[#173926]">
          {order.customer_city}
        </h3>
      </div>

      <div>
        <p className="text-sm text-[#5a685f]">
          Pincode
        </p>

        <h3 className="text-xl font-semibold text-[#173926]">
          {order.customer_pincode}
        </h3>
      </div>

    </div>

  </div>

  <div className="mt-8">

    <p className="text-sm text-[#5a685f]">
      Address
    </p>

    <div className="mt-2 bg-[#f7f5ef] p-5 rounded-2xl text-[#173926]">
      {order.customer_address}
    </div>

  </div>

  <div className="mt-6 flex items-center justify-between flex-wrap gap-4">

    <div>
      <p className="text-sm text-[#5a685f]">
        Payment ID
      </p>

      <h3 className="font-semibold text-[#173926] break-all">
        {order.payment_id}
      </h3>
    </div>

    <div className="flex items-center gap-4 flex-wrap">

  <div className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
    Paid
  </div>

  <select
    value={order.status}
    onChange={async (e) => {

      await supabase
        .from('orders')
        .update({
          status: e.target.value,
        })
        .eq('id', order.id);

      fetchOrders();

    }}
    className="px-4 py-2 rounded-xl border border-[#dfe7e1] outline-none"
  >
    <option>Pending</option>
    <option>Packed</option>
    <option>Shipped</option>
    <option>Delivered</option>
  </select>

</div>

  </div>

</div>
        ))}

      </div>

    </main>

  );
}