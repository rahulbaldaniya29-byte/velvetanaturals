'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountSignupPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

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
        'Account Created Successfully ✅'
      );

      setName('');
      setEmail('');
      setPhone('');

    }

  };

  return (

  <main className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-md">

      <div className="bg-white rounded-[35px] shadow-2xl p-8 md:p-10">

        <div className="text-center">

          <h1 className="text-4xl font-black text-[#173926]">
            Create Account
          </h1>

          <p className="mt-3 text-[#5a685f]">
            Join Velveta Naturals today
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <div>

            <label className="block text-[#173926] font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-[#173926]
              "
            />

          </div>

          <div>

            <label className="block text-[#173926] font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-[#173926]
              "
            />

          </div>

          <div>

            <label className="block text-[#173926] font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-[#173926]
              "
            />

          </div>

        </div>

        <button
          onClick={createAccount}
          className="
            w-full
            mt-8
            bg-[#173926]
            hover:bg-[#28543c]
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all
          "
        >
          Create Account
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

          <p className="text-[#5a685f]">
            Already have an account?
          </p>

          <button
            onClick={() =>
              window.location.href =
                '/account/login'
            }
            className="
              mt-3
              text-[#173926]
              font-bold
            "
          >
            Login Here
          </button>

        </div>

      </div>

    </div>

  </main>

);
}