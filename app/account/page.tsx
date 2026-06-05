'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {

  const [customer, setCustomer] =
    useState<any>(null);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [saving, setSaving] = useState(false);
const [totalOrders, setTotalOrders] = useState(0);
const [totalSpent, setTotalSpent] = useState(0);
const [lastOrder, setLastOrder] = useState('');
const [recentOrder, setRecentOrder] =
  useState<any>(null);
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

    fetchCustomer(email);

  }, []);

  const fetchCustomer = async (
    email: string
  ) => {

    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (data) {

  setCustomer(data);

  setName(data.name || '');

  setPhone(data.phone || '');
fetchStats(email);
}


  };

  const logout = () => {

    localStorage.removeItem(
      'customerEmail'
    );

    window.location.href =
      '/account/login';

  };
  const fetchStats = async (
  email: string
) => {

  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', email);

  if (!data) return;

  setTotalOrders(data.length);

  const spent = data.reduce(
    (sum, order) =>
      sum + Number(order.amount || 0),
    0
  );

  setTotalSpent(spent);

  if (data.length > 0) {

  const latest =
    data[data.length - 1];

  setLastOrder(
    latest.order_id
  );

  setRecentOrder(latest);

}

};
const saveProfile = async () => {

  if (!customer) return;

  setSaving(true);

  await supabase
    .from('customers')
    .update({
      name,
      phone,
    })
    .eq('id', customer.id);

  setCustomer({
    ...customer,
    name,
    phone,
  });

  setSaving(false);

  alert(
    'Profile Updated ✅'
  );

};
  if (!customer) {
    return (
      <main className="min-h-screen bg-[#f7f5ef] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[35px] p-8 shadow-xl">
            <p className="text-center text-[#173926] font-semibold">
              Loading...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[35px] p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-[#173926]">
                My Account
              </h1>

              <p className="mt-2 text-[#5a685f] text-lg">
                Welcome back, {customer.name}
              </p>

              <p className="text-[#5a685f]">
                {customer.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="
                px-6
                py-3
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                text-white
                font-semibold
              "
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#f7f5ef] rounded-3xl p-5">
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-3xl font-black text-[#173926] mt-2">
                {totalOrders}
              </h2>
            </div>

            <div className="bg-[#f7f5ef] rounded-3xl p-5">
              <p className="text-gray-500 text-sm">Total Spent</p>
              <h2 className="text-3xl font-black text-[#173926] mt-2">
                ₹{totalSpent}
              </h2>
            </div>

            <div className="bg-[#f7f5ef] rounded-3xl p-5">
              <p className="text-gray-500 text-sm">Last Order</p>
              <h2 className="text-sm font-bold text-[#173926] mt-2 break-all">
                {lastOrder || 'N/A'}
              </h2>
            </div>

            <div className="bg-[#f7f5ef] rounded-3xl p-5">
              <p className="text-gray-500 text-sm">Member Since</p>
              <h2 className="font-bold text-[#173926] mt-2">
                {new Date(customer.created_at).toLocaleDateString('en-IN')}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-[35px] p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-[#173926]">Profile Information</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <label htmlFor="full-name" className="block text-gray-500 mb-2">Full Name</label>
              <input
                id="full-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                title="Full Name"
                placeholder="Enter your full name"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  p-4
                  outline-none
                "
              />
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-gray-500 mb-2">Phone Number</label>
              <input
                id="phone-number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                title="Phone Number"
                placeholder="Enter your phone number"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  p-4
                  outline-none
                "
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email-address" className="block text-gray-500 mb-2">Email Address</label>
              <input
                id="email-address"
                type="text"
                value={customer.email}
                readOnly
                title="Email Address"
                placeholder="Your email address"
                className="
                  w-full
                  bg-gray-100
                  rounded-2xl
                  p-4
                  outline-none
                "
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={saveProfile}
              className="
                px-6
                py-3
                rounded-2xl
                bg-[#173926]
                hover:bg-[#28543c]
                text-white
                font-semibold
              "
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>

            <button
              onClick={() => (window.location.href = '/orders')}
              className="
                px-6
                py-3
                rounded-2xl
                bg-[#c3955d]
                hover:opacity-90
                text-white
                font-semibold
              "
            >
              My Orders
            </button>
          </div>
                </div>

        <div className="mt-8 bg-white rounded-[35px] p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-[#173926]">
            Recent Order
          </h2>

          {recentOrder ? (

            <div className="mt-6 grid md:grid-cols-4 gap-4">

              <div className="bg-[#f7f5ef] p-5 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Product
                </p>

                <h3 className="font-bold text-[#173926] mt-2">
                  {recentOrder.product_name}
                </h3>
              </div>

              <div className="bg-[#f7f5ef] p-5 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Amount
                </p>

                <h3 className="font-bold text-[#173926] mt-2">
                  ₹{recentOrder.amount}
                </h3>
              </div>

              <div className="bg-[#f7f5ef] p-5 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <h3 className="font-bold text-[#173926] mt-2">
                  {recentOrder.status}
                </h3>
              </div>

              <div className="bg-[#f7f5ef] p-5 rounded-2xl">
                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <h3 className="font-bold text-[#173926] mt-2 break-all">
                  {recentOrder.order_id}
                </h3>
              </div>

            </div>

          ) : (

            <p className="mt-4 text-gray-500">
              No orders found.
            </p>

          )}

        </div>

      </div>
    </main>


  );
}
