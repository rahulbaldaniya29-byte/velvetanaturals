'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
export default function AdminLogin() {

  const [password, setPassword] =
    useState('');
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState('');
  const login = () => {

  if (
    password ===
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {

    localStorage.setItem(
      'adminAuth',
      'true'
    );

    window.location.href =
      '/admin';

  } else {

    setError('Invalid Password');

    setTimeout(() => {
      setError('');
    }, 2500);

  }

};
  return (

    <main className="min-h-screen flex items-center justify-center">
      {error && (
  <div
    className="
      fixed
      top-5
      right-5
      bg-red-500
      text-white
      px-5
      py-3
      rounded-2xl
      shadow-2xl
      z-50
      font-semibold
    "
  >
    {error}
  </div>
)}

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-5">
          Admin Login
        </h1>

        <div className="relative">

  <input
  onKeyDown={(e) => {
  if (e.key === 'Enter') {
    login();
  }
}}
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border p-3 rounded-xl pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="absolute right-3 top-1/2 -translate-y-1/2"
  >
    {showPassword ? (
  <EyeOff size={20} />
) : (
  <Eye size={20} />
)}
  </button>

</div>
        <button
          onClick={login}
          className="mt-4 w-full bg-[#173926] text-white p-3 rounded-xl"
        >
          Login
        </button>

      </div>

    </main>

  );

}