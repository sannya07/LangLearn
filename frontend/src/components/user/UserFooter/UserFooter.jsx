// Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 space-y-8 md:space-y-0 md:flex md:flex-row md:justify-between md:items-center">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <h2 className="text-3xl font-bold text-indigo-600">Lang Learn</h2>
          <p className="mt-2 text-lg text-gray-400 text-center md:text-left">
            Empowering education with interactive learning tools and a community of learners.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <h3 className="text-xl font-semibold text-gray-200">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="/home" className="text-sm text-gray-400 hover:text-indigo-600">Home</a></li>
            <li><a href="#courses" className="text-sm text-gray-400 hover:text-indigo-600">Courses</a></li>
            <li><a href="#about" className="text-sm text-gray-400 hover:text-indigo-600">About</a></li>
            <li><a href="#contact" className="text-sm text-gray-400 hover:text-indigo-600">Contact</a></li>
            <li><a href="#blog" className="text-sm text-gray-400 hover:text-indigo-600">Blog</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <h3 className="text-xl font-semibold text-gray-200">Stay Updated</h3>
          <p className="text-sm text-gray-400 mt-2">Subscribe to our newsletter for the latest courses, tips, and news.</p>
          <div className="mt-4 flex flex-row">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-l-md text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-indigo-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-indigo-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-indigo-600">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2024 Lang Learn. All rights reserved. | 
          <a href="#terms" className="text-gray-400 hover:text-indigo-600 ml-2">Terms & Conditions</a> | 
          <a href="#privacy" className="text-gray-400 hover:text-indigo-600 ml-2">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
