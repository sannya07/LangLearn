import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline text-xl">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
