'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';



export default function AccountSignupPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
const router = useRouter();
  const createAccount = async () => {

    const { error } = await supabase
      .from('customers')
      .insert([
        {
          name,
          email,
          phone,
        },
      ]);

    if (error) {

      setMessage(error.message);

    } else {

      setMessage(
  'Account created successfully. You can now sign in.'
);

      setName('');
      setEmail('');
      setPhone('');

    }

  };

  return (

  <main className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-md">

 <div
  className="
    mt-5
    p-4
    rounded-2xl
    bg-green-50
    border
    border-green-200
    text-green-700
    text-center
    font-medium
  "
>
<div className="flex justify-center mb-6">

  <div
    className="
      w-20
      h-20
      rounded-full
      bg-[#173926]
      text-white
      flex
      items-center
      justify-center
      text-3xl
      font-black
      shadow-xl
    "
  >
    V
  </div>

</div>
        <div className="text-center">

         <h1 className="text-4xl md:text-5xl font-black text-[#173926]">
  Create Account
</h1>

<p className="mt-3 text-[#6b7280]">
  Join Velveta Naturals and manage
  your orders with ease
</p>

        </div>

        <div className="mt-8 space-y-5">

         <div className="relative">

  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
    👤
  </span>

  <input
    type="text"
    placeholder="Enter your full name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="
      w-full
      pl-14
      pr-5
      py-4
      border-2
      border-[#e8ece8]
      rounded-3xl
      bg-white
      outline-none
      focus:border-[#173926]
      focus:shadow-lg
      transition-all
    "
  />

</div>

          <div className="relative">

  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
    📧
  </span>

  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="
      w-full
      pl-14
      pr-5
      py-4
      border-2
      border-[#e8ece8]
      rounded-3xl
      bg-white
      outline-none
      focus:border-[#173926]
      focus:shadow-lg
      transition-all
    "
  />

</div>

          <div className="relative">

  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
    📱
  </span>

  <input
    type="text"
    placeholder="Enter your phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="
      w-full
      pl-14
      pr-5
      py-4
      border-2
      border-[#e8ece8]
      rounded-3xl
      bg-white
      outline-none
      focus:border-[#173926]
      focus:shadow-lg
      transition-all
    "
  />

</div>

        </div>

        <button
  onClick={createAccount}
  className="
    w-full
    mt-8
    py-4
    rounded-3xl
    bg-gradient-to-r
    from-[#173926]
    to-[#28543c]
    text-white
    font-bold
    text-lg
    shadow-xl
    hover:shadow-2xl
    hover:scale-[1.02]
    active:scale-[0.98]
    transition-all
    duration-300
    flex
    items-center
    justify-center
    gap-3
  "
>
  ✨ Create Account
</button>

        {message && (

          <div
            className="
              mt-5
              p-4
              rounded-2xl
              bg-[#f7f5ef]
              text-center
              font-medium
            "
          >
            {message}
          </div>

        )}

        <div className="mt-8 text-center">

<p className="text-[#6b7280]">
  Already have an account?
</p>
<button
  onClick={() => router.push('/account/login')}
  className="
    mt-3
    text-[#173926]
    font-bold
    hover:underline
  "
>
  Sign In →
</button>
         
        </div>

      </div>

    </div>

  </main>

);
}