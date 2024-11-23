import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getNavColorScheme = () => {
    if (location.pathname.includes('/donor')) {
      return { bg: 'bg-red-500', hover: 'hover:text-red-500', text: 'text-red-500' };
    } else if (location.pathname.includes('/hospital')) {
      return { bg: 'bg-blue-500', hover: 'hover:text-blue-500', text: 'text-blue-500' };
    } else if (location.pathname.includes('/organization')) {
      return { bg: 'bg-yellow-500', hover: 'hover:text-yellow-500', text: 'text-yellow-500' };
    }
    return { bg: 'bg-red-500', hover: 'hover:text-red-500', text: 'text-red-500' };
  };

  const { bg, hover, text } = getNavColorScheme();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className={`h-8 w-8 ${text}`} />
            <span className="text-2xl font-bold text-gray-800">LifeLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          <Link to="/home" className={`text-gray-600 ${hover} transition-colors`}>
              Home
            </Link>
            <Link to="/donor/login" className={`text-gray-600 ${hover} transition-colors`}>
              For Donors
            </Link>
            <Link to="/hospital/login" className={`text-gray-600 hover:text-blue-500 transition-colors`}>
              For Hospitals
            </Link>
            <Link to="/organization/login" className={`text-gray-600 hover:text-yellow-500 transition-colors`}>
              For Organizations
            </Link>
            <Link to="/blood-requests" className={`text-gray-600 hover:text-yellow-500 transition-colors`}>
              Requests
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/donor/login"
                className="text-gray-600 hover:text-red-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                For Donors
              </Link>
              <Link
                to="/hospital/login"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                For Hospitals
              </Link>
              <Link
                to="/organization/login"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                For Organizations
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;