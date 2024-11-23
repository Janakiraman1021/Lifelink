import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lifelink-backend-1sci.onrender.com//hospital/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/hospital/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block">
            <Building2 className="h-12 w-12 text-blue-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Hospital Portal</h2>
          <p className="text-gray-600 mt-2">Access your medical institution account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-600 text-sm">
            Forgot your password?
          </Link>
          <p className="mt-4 text-gray-600 text-sm">
            Need hospital registration?{' '}
            <Link to="/hospital/signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HospitalLogin;
