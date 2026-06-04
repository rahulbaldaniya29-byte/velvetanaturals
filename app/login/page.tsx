'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    setMessage('Sending OTP...');

    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setOtpSent(true);
      setMessage('OTP sent successfully.');
    } else {
      setMessage('Failed to send OTP.');
    }
  };

  const verifyOtp = async () => {
    setMessage('Verifying...');

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await res.json();

    if (data.success) {
  if (data.success) {
  router.push('/orders');
}
  router.push('/orders');
} else {
      setMessage(
        data.message || 'Invalid OTP'
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8f5ef]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[400px] max-w-[90%]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Customer Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
        />

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="mt-4 w-full bg-[#173926] text-white p-3 rounded-xl"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-4"
            />

            <button
              onClick={verifyOtp}
              className="mt-4 w-full bg-[#173926] text-white p-3 rounded-xl"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}