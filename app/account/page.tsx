'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {

  const [customer, setCustomer] =
    useState<any>(null);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [stateName, setStateName] = useState('');
const [pincode, setPincode] = useState('');
const [landmark, setLandmark] = useState('');
const [saving, setSaving] = useState(false);
const profileFields = [
  name,
  phone,
  address,
  city,
  stateName,
  pincode,
  landmark,
];

const completedFields =
  profileFields.filter(
    (field) => field?.trim() !== ''
  ).length;

const profileCompletion = Math.round(
  (completedFields / profileFields.length) * 100
);
const [isEditing, setIsEditing] = useState(false);
const [success, setSuccess] = useState(false);
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
  setAddress(data.address || '');
setCity(data.city || '');
setStateName(data.state || '');
setPincode(data.pincode || '');
setLandmark(data.landmark || '');
}


  };

  const logout = () => {

  localStorage.removeItem(
    'customerEmail'
  );

  window.location.replace('/');

};
  
const saveProfile = async () => {

  if (!customer) return;

  setSaving(true);

  await supabase
    .from('customers')
   .update({
  name,
  phone,
  address,
  city,
  state: stateName,
  pincode,
  landmark,
})
    .eq('id', customer.id);

  setCustomer({
  ...customer,
  name,
  phone,
  address,
  city,
  state: stateName,
  pincode,
  landmark,
});
setIsEditing(false);
  setSaving(false);

setSuccess(true);

setTimeout(() => {
  setSuccess(false);
}, 3000);
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
      {success && (
  <div
    className="
      fixed
      top-5
      right-5
      bg-white
      border
      border-green-200
      text-[#173926]
      px-6
      py-4
      rounded-2xl
      shadow-2xl
      z-50
      font-semibold
    "
  >
    ✅ Profile updated successfully
  </div>
)}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[35px] p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">

  <div
    className="
      w-16
      h-16
      rounded-full
      bg-[#173926]
      text-white
      flex
      items-center
      justify-center
      text-2xl
      font-bold
    "
  >
    {name?.charAt(0)?.toUpperCase()}
  </div>

  <div>
    <h3 className="text-xl font-bold text-[#173926]">
      {name || 'Customer'}
    </h3>

    <p className="text-[#6b7280]">
      Velveta Member
    </p>
  </div>

</div>
              <div>
  
  <h1 className="text-4xl md:text-5xl font-black text-[#173926]">
    {name || 'Customer'}
  </h1>

  <p className="mt-2 text-[#6b7280]">
    Manage your profile and delivery information
  </p>
</div>
            </div>

<button
  onClick={logout}
  className="
    px-6
    py-3
    rounded-2xl
    border
    border-red-200
    bg-red-50
    hover:bg-red-100
    text-red-600
    font-semibold
    transition-all
    duration-300
  "
>
  Logout
</button>
          </div>

        </div>
        <div className="mt-8 bg-white rounded-[35px] p-8 shadow-xl border border-[#e5ebe7]">

  <div className="flex items-center justify-between mb-4">

    <div>

      <p className="text-[#c3955d] font-bold tracking-[2px] uppercase">
        Profile Strength
      </p>

      <h3 className="text-2xl font-bold text-[#173926]">
        {profileCompletion}% Complete
      </h3>

    </div>

    <div className="text-4xl">
      🚀
    </div>

  </div>

  <div className="w-full h-4 bg-[#eceeea] rounded-full overflow-hidden">

    <div
      className="h-full bg-gradient-to-r from-[#173926] to-[#c3955d] rounded-full transition-all duration-500"
      style={{
        width: `${profileCompletion}%`,
      }}
    />

  </div>

  <p className="mt-3 text-[#6b7280]">
    Complete your profile to enjoy a faster checkout experience.
  </p>

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
                disabled={!isEditing}
                title="Full Name"
                placeholder="Enter your full name"
                className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
              />
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-gray-500 mb-2">Phone Number</label>
              <input
                id="phone-number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                title="Phone Number"
                placeholder="Enter your phone number"
                className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
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
    cursor-not-allowed
  "
/>
            </div>
              <div>
  <label htmlFor="address" className="block text-gray-500 mb-2">
    Address
  </label>

  <input
    id="address"
    type="text"
    value={address}
    onChange={(e) =>
      setAddress(e.target.value)
    }
    disabled={!isEditing}
    title="Address"
    placeholder="Enter your address"
    className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
  />
</div>

<div>
  <label htmlFor="city" className="block text-gray-500 mb-2">
    City
  </label>

  <input
    id="city"
    type="text"
    value={city}
    onChange={(e) =>
      setCity(e.target.value)
    }
    disabled={!isEditing}
    title="City"
    placeholder="Enter your city"
    className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
  />
</div>

<div>
  <label htmlFor="state" className="block text-gray-500 mb-2">
    State
  </label>

  <input
    id="state"
    type="text"
    value={stateName}
    onChange={(e) =>
      setStateName(e.target.value)
    }
    disabled={!isEditing}
    title="State"
    placeholder="Enter your state"
    className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
  />
</div>

<div>
  <label htmlFor="pincode" className="block text-gray-500 mb-2">
    Pincode
  </label>

  <input
    id="pincode"
    type="text"
    value={pincode}
    onChange={(e) =>
      setPincode(e.target.value)
    }
    disabled={!isEditing}
    title="Pincode"
    placeholder="Enter your pincode"
    className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
  />
</div>

<div>
  <label htmlFor="landmark" className="block text-gray-500 mb-2">
    Landmark
  </label>

  <input
    id="landmark"
    type="text"
    value={landmark}
    onChange={(e) =>
      setLandmark(e.target.value)
    }
    disabled={!isEditing}
    title="Landmark"
    placeholder="Enter a nearby landmark"
    className={`
  w-full
  rounded-2xl
  p-4
  outline-none
  transition-all
  ${
    isEditing
      ? 'border border-gray-200 bg-white'
      : 'border-0 bg-transparent'
  }
`}
  />
</div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {isEditing ? (
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
) : (
  <button
    onClick={() => setIsEditing(true)}
    className="
      px-6
      py-3
      rounded-2xl
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-semibold
    "
  >
    Edit Profile
  </button>
)}
          </div>
          
                </div>

        

      </div>
    </main>


  );
}
