'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountLoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
      setMessage('OTP sent successfully ✓');
setError('');
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

      setError('Invalid OTP');
setMessage('');

    }

  };

  return (

  <main className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      <div className="
  bg-white
  rounded-[35px]
  shadow-2xl
  border
  border-[#e5ebe7]
  p-8
  md:p-10
">
{message && (
  <div className="
    mb-4
    bg-green-50
    border
    border-green-200
    text-green-700
    p-4
    rounded-2xl
  ">
    {message}
  </div>
)}

{error && (
  <div className="
    mb-4
    bg-red-50
    border
    border-red-200
    text-red-700
    p-4
    rounded-2xl
  ">
    {error}
  </div>
)}
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
  Sign In
</h1>

<p className="mt-3 text-[#6b7280]">
  Access your orders, profile and saved delivery details
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
bg-[#f7f5ef]
border
border-[#e5ebe7]
rounded-2xl
p-4
outline-none
focus:border-[#173926]
transition-all
duration-300
"
          />

        </div>

        {!otpSent ? (
<button
  onClick={sendOtp}
  className="
    mt-6
    w-full
    bg-gradient-to-r
    from-[#173926]
    to-[#28543c]
    hover:scale-[1.02]
    text-white
    py-4
    rounded-2xl
    font-bold
    text-lg
    shadow-lg
    transition-all
    duration-300
    flex
    items-center
    justify-center
    gap-2
  "
>
  📩 Send OTP
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

          <p className="text-[#6b7280]">
  Don't have an account yet?
</p>

         <button
  onClick={() => router.push('/account/signup')}
  className="
    mt-3
    text-[#173926]
    font-bold
    hover:underline
  "
>
  Create Account →
</button>

        </div>

      </div>

    </div>

  </main>

);
}