import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white py-4 shadow-lg fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-purple-500">
          <a href='/'>LangLearn.</a>
          </div>
        {/* Links for Desktop */}
        <div className="hidden md:flex gap-6">
          <a href="/signups" className="hover:text-purple-400 transition">
            Signup
          </a>
          <a href="/logins" className="hover:text-purple-400 transition">
            Login
          </a>
          <a href="#contact" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.1 }}
          className="flex flex-col items-center bg-black text-white md:hidden"
        >
          <a href="#Signin" className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Login
          </a>
          <a href="#features" className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Features
          </a>
          <a href="#about" className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a href="#contact" className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
