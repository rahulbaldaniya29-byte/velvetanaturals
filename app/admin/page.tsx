'use client';

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';
// @ts-ignore: Missing type declarations for 'file-saver'
import { saveAs } from 'file-saver';
export default function AdminPage() {
  function downloadInvoice(order: any) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Velveta Naturals', 20, 20);

  doc.setFontSize(16);
  doc.text('Invoice', 20, 35);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.order_id}`, 20, 55);
  doc.text(`Product: ${order.product_name}`, 20, 70);
  doc.text(`Amount: Rs ${order.amount}`, 20, 85);
  doc.text(`Customer: ${order.customer_name}`, 20, 100);
  doc.text(`Phone: ${order.customer_phone}`, 20, 115);
  doc.text(`Address: ${order.customer_address}`, 20, 130);
  doc.text(`Status: ${order.status}`, 20, 145);
  doc.text(`Date: ${order.order_date}`, 20, 160);
  doc.text(`Payment ID: ${order.payment_id}`, 20, 175);

  doc.save(`invoice-${order.order_id}.pdf`);
}
const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const totalRevenue = orders.reduce(
  (acc, order) => acc + order.amount,
  0
);

const deliveredOrders = orders.filter(
  (order) => order.status === 'Delivered'
).length;

const pendingOrders = orders.filter(
  (order) => order.status !== 'Delivered'
).length;

const totalCustomers = new Set(
  orders.map((order) => order.customer_phone)
).size;

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
  function exportOrders() {

  const formattedOrders = orders.map((order) => ({

    Product: order.product_name,

    Amount: order.amount,

    Quantity: order.quantity,

    Customer: order.customer_name,

    Phone: order.customer_phone,

    Email: order.customer_email,

    Address: order.customer_address,

    City: order.customer_city,

    State: order.customer_state,

    Pincode: order.customer_pincode,

    Status: order.status,

    PaymentID: order.payment_id,

    OrderID: order.order_id,

    Date: order.order_date,

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(formattedOrders);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Orders'
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    }
  );

  saveAs(
    fileData,
    'velveta-orders.xlsx'
  );

}
const filteredOrders = orders.filter((order) =>
  order.customer_name
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||

  order.customer_phone
    ?.includes(search) ||

  order.product_name
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||

  order.order_id
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||

  order.payment_id
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
  return (

    <main className="min-h-screen bg-[#f7f5ef] p-5 md:p-10">

     <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
      

  <div>
    <h1 className="text-3xl md:text-5xl font-black text-[#173926]">
      Velveta Admin
    </h1>

    <p className="mt-3 text-[#5a685f] text-lg">
      Manage Orders & Customers
    </p>
  </div>

  <div className="bg-[#173926] text-white px-6 py-4 rounded-3xl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10 mb-10">

  <div className="bg-white rounded-[30px] p-6 shadow-xl border border-[#e5ebe7]">
    <p className="text-[#5a685f] text-sm">
      Total Revenue
    </p>

    <h2 className="mt-3 text-3xl font-black text-[#173926]">
      ₹{totalRevenue}
    </h2>
  </div>

  <div className="bg-white rounded-[30px] p-6 shadow-xl border border-[#e5ebe7]">
    <p className="text-[#5a685f] text-sm">
      Delivered
    </p>

    <h2 className="mt-3 text-3xl font-black text-green-600">
      {deliveredOrders}
    </h2>
  </div>

  <div className="bg-white rounded-[30px] p-6 shadow-xl border border-[#e5ebe7]">
    <p className="text-[#5a685f] text-sm">
      Pending
    </p>

    <h2 className="mt-3 text-3xl font-black text-orange-500">
      {pendingOrders}
    </h2>
  </div>

  <div className="bg-white rounded-[30px] p-6 shadow-xl border border-[#e5ebe7]">
    <p className="text-[#5a685f] text-sm">
      Customers
    </p>

    <h2 className="mt-3 text-3xl font-black text-[#173926]">
      {totalCustomers}
    </h2>
  </div>

</div>
    <h2 className="text-3xl font-bold">
      {orders.length}
    </h2>

    <p className="text-white/70 text-sm">
      Total Orders
    </p>
  </div>

</div>
<div className="mb-10">
<button
  onClick={exportOrders}
  className="
    mb-6
    px-6
    py-4
    rounded-3xl
    bg-[#173926]
    hover:bg-[#28543c]
    text-white
    font-semibold
    transition-all
    duration-300
    shadow-xl
  "
>
  Export Excel
</button>
  <input
    type="text"
    placeholder="Search customer, phone or product..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      bg-white
      border
      border-[#dfe7e1]
      rounded-3xl
      px-6
      py-5
      outline-none
      text-[#173926]
      shadow-lg
    "
  />

</div>

      <div className="grid gap-6">
{filteredOrders.map((order) => (

<div
  key={order.id}
  className="bg-white rounded-[30px] p-5 md:p-8 shadow-xl border border-[#e5ebe7]"
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
<p className="mt-2 text-[#5a685f] text-lg">
  Order ID: {order.order_id}
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

  <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 flex-wrap gap-4">

    <div>
      <p className="text-sm text-[#5a685f]">
        Payment ID
      </p>

      <h3 className="font-semibold text-[#173926] break-all">
        {order.payment_id}
      </h3>
    </div>

    <div className="flex items-center gap-4 flex-wrap">
      <a
  href={`https://wa.me/91${order.customer_phone}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    px-5
    py-3
    rounded-2xl
    bg-green-500
    hover:bg-green-600
    text-white
    font-semibold
    transition-all
    duration-300
  "
>
  WhatsApp
</a>

<a
  href={`tel:${order.customer_phone}`}
  className="
    px-5
    py-3
    rounded-2xl
    bg-blue-500
    hover:bg-blue-600
    text-white
    font-semibold
    transition-all
    duration-300
  "
>
  Call
</a>
      <button
  onClick={async () => {

    const confirmDelete =
      confirm('Delete this order?');

    if (!confirmDelete) return;

    await supabase
      .from('orders')
      .delete()
      .eq('id', order.id);

    fetchOrders();

  }}
  className="
    px-5
    py-3
    rounded-2xl
    bg-red-500
    hover:bg-red-600
    text-white
    font-semibold
    transition-all
    duration-300
  "
>
  Delete
</button>
<button
  onClick={() => downloadInvoice(order)}
  className="
    px-5
    py-3
    rounded-2xl
    bg-blue-600
    hover:bg-blue-700 
    text-white
    font-semibold
    transition-all
    duration-300
  "
>
  Invoice PDF
</button>
  <div className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
    Paid
  </div>

  <select
    aria-label="Order status"
    value={order.status}
    onChange={async (e) => {

      const newStatus = e.target.value;

      await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);

      fetchOrders();

    }}
    className="px-5 py-3 rounded-2xl bg-[#173926] text-white outline-none"
  >


  <option value="Packed">
    Packed
  </option>

  <option value="Shipped">
    Shipped
  </option>
  <option value="Out For Delivery">
  Out For Delivery
</option>

  <option value="Delivered">
    Delivered
  </option>

</select>
</div>

  </div>

</div>
        ))}

      </div>

    </main>

  );
}