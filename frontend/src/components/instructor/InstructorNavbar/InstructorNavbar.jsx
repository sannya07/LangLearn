import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate to handle redirection

function InstructorNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const logout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page after logout
    navigate("/"); // Redirect to login or homepage
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/instructor/home" className="text-xl font-bold">
          Instructor Dashboard
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/instructor/home" className="hover:underline">
            Home
          </Link>
          <Link to="/instructor/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/instructor/courses" className="hover:underline">
            Courses
          </Link>
          <Link to="/instructor/assignments" className="hover:underline">
            Assignments
          </Link>
          <Link to="/instructor/reports" className="hover:underline">
            Reports
          </Link>
          <Link to="/instructor/support" className="hover:underline">
            Support
          </Link>
          {/* Logout link */}
          <button
            className="hover:underline"
            onClick={logout} // Call logout function when clicked
          >
            Logout
          </button>
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
        <div className="md:hidden bg-gray-900">
          <Link
            to="/instructor/home"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/instructor/profile"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/instructor/courses"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/instructor/assignments"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Assignments
          </Link>
          <Link
            to="/instructor/reports"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/instructor/support"
            className="block px-4 py-2 hover:bg-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Support
          </Link>
          {/* Logout button in mobile menu */}
          <button
            className="block px-4 py-2 hover:bg-gray-900 w-full text-left"
            onClick={() => {
              setIsMenuOpen(false); // Close the menu
              logout(); // Call the logout function
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default InstructorNavbar;
