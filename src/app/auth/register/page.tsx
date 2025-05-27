'use client';

import { useState } from 'react';
import "../../globals.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' , role: 'USER'});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setMessage('Registration successful! Please login.');
      } else {
        const err = await res.json();
        setMessage(err.message || 'Registration failed.');
        setLoading(false);
      }
    } catch (error) {
      setMessage('Network error.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
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
        <input 
            type="text"
            name="role"
            placeholder="Role"
            value='USER'
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Logging in...
            </>
          ) : (
            "Register"
          )}
        </button>
        {message && <div className="mt-2 text-center text-red-600">{message}</div>}
      </form>
    </div>
  );
}
