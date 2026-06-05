'use client';

import { useState } from 'react';

export default function AccountLoginPage() {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] =
    useState(false);

  const sendOtp = async () => {

    const res = await fetch(
      '/api/send-otp',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (res.ok) {
      setOtpSent(true);
      alert('OTP Sent ✅');
    }

  };

  const verifyOtp = async () => {

    const res = await fetch(
      '/api/verify-otp',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      }
    );

    if (res.ok) {

      localStorage.setItem(
        'customerEmail',
        email
      );

      window.location.href =
        '/account';

    } else {

      alert('Invalid OTP');

    }

  };

  return (

  <main className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      <div className="bg-white rounded-[35px] shadow-2xl p-8 md:p-10">

        <div className="text-center">

          <h1 className="text-4xl font-black text-[#173926]">
            Welcome Back
          </h1>

          <p className="mt-3 text-[#5a685f]">
            Login to your Velveta Account
          </p>

        </div>

        <div className="mt-8">

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

        {!otpSent ? (

          <button
            onClick={sendOtp}
            className="
              mt-6
              w-full
              bg-[#173926]
              hover:bg-[#28543c]
              text-white
              py-4
              rounded-2xl
              font-semibold
              transition-all
            "
          >
            Send OTP
          </button>

        ) : (

          <>

            <div className="mt-6">

              <label className="block text-[#173926] font-semibold mb-2">
                OTP Code
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
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

            <button
              onClick={verifyOtp}
              className="
                mt-6
                w-full
                bg-[#173926]
                hover:bg-[#28543c]
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition-all
              "
            >
              Verify OTP
            </button>

          </>

        )}

        <div className="mt-8 text-center">

          <p className="text-[#5a685f]">
            New Customer?
          </p>

          <button
            onClick={() =>
              window.location.href =
                '/account/signup'
            }
            className="
              mt-3
              text-[#173926]
              font-bold
            "
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  </main>

);
}