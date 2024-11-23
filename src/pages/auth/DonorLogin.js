import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DonorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lifelink-backend-1sci.onrender.com//donor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/donor/dashboard');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block">
            <Droplet className="h-12 w-12 text-red-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome Back, Donor</h2>
          <p className="text-gray-600 mt-2">Your generosity saves lives</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-red-500 hover:text-red-600 text-sm">
            Forgot your password?
          </Link>
          <p className="mt-4 text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/donor/signup" className="text-red-500 hover:text-red-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DonorLogin;
