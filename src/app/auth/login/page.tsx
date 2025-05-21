'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import "../../globals.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  // const [myVariable, setMyVariable] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            userEmail : form.email,
            userPassword : form.password
          }),
        }
      );

      if (res.ok) {
        console.log("Successfull");
        console.log('res :', res);
        const data = await res.json();
        // Save JWT token to localStorage or cookies
        localStorage.setItem('userEmail', form.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        //Trigger storage event to update navbar
        window.dispatchEvent(new Event('storage')); 
        router.push('/dashboard'); // Redirect to dashboard or home
      } else {
        const err = await res.json();
        setMessage(err.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('Network error.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        {message && <div className="mt-2 text-center text-red-600">{message}</div>}
      </form>
    </div>
  );
}
