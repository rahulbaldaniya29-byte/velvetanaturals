'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
      emailRedirectTo:
  `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        'Check your email for login link.'
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-5">
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

        <button
          onClick={login}
          className="mt-4 w-full bg-[#173926] text-white p-3 rounded-xl"
        >
          Send Login Link
        </button>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}