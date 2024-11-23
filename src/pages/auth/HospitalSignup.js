import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalSignup = () => {
  const [name, setName] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lifelink-backend-1sci.onrender.com/hospital/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, hospitalId, email, password }),
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate('/hospital/login');
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
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Hospital Registration</h2>
          <p className="text-gray-600 mt-2">Join our network of partner hospitals</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter hospital name"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
            <input
              type="text"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter hospital ID"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter email"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter password"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Register
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/hospital/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HospitalSignup;
