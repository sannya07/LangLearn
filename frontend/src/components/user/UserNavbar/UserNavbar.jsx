import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/user/home" className="text-xl font-bold">
          User Dashboard
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/user/home" className="hover:underline">
            Home
          </Link>
          <Link to="/user/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/user/courses" className="hover:underline">
            Courses
          </Link>
          <Link to="/user/support" className="hover:underline">
            Support
          </Link>
          <Link to="/user/logout" className="hover:underline">
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link
            to="/user/home"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/user/profile"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/user/courses"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/user/support"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Support
          </Link>
          <Link
            to="/user/logout"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;
