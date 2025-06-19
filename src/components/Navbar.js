import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiMenu, FiX, FiHome, FiInfo, FiFileText, FiSettings, FiUser, FiBook } from 'react-icons/fi';

export default function Navbar(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'About Us', path: '/about', icon: <FiInfo /> },
    { name: 'Docs', path: '/docs', icon: <FiBook /> },
    { name: 'Templates', path: '/templates', icon: <FiFileText /> },
    { name: 'Profile', path: '/profile', icon: <FiUser /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> }
  ];

  const itemVariants = {
    hover: {
      y: -3,
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 }
    },
    tap: {
      scale: 0.95
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <nav className={`bg-${props.mode === 'dark' ? 'gray-800' : 'white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Brand & Links */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                className={`flex items-center text-${props.mode === 'dark' ? 'white' : 'gray-900'} font-bold text-xl`} 
                to="/"
              >
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-2xl">
                  {props.title}
                </span>
              </Link>
            </motion.div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              {navItems.slice(0, 4).map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    className={`relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      props.mode === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`}
                    to={item.path}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                    {hoveredItem === item.name && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                        layoutId="navUnderline"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Dark mode toggle and more */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex items-center space-x-4"
            >
              {navItems.slice(4).map((item) => (
                <Link
                  key={item.name}
                  className={`flex items-center p-2 rounded-full ${
                    props.mode === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                  to={item.path}
                >
                  {item.icon}
                </Link>
              ))}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={props.toggleMode}
                className={`p-2 rounded-full ${
                  props.mode === 'dark' 
                    ? 'text-yellow-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {props.mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="sm:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="sm:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <motion.div 
              className={`pt-2 pb-4 space-y-1 ${props.mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={mobileItemVariants}
                >
                  <Link
                    className={`flex items-center px-4 py-3 text-base font-medium ${
                      props.mode === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleMode: PropTypes.func.isRequired,
};