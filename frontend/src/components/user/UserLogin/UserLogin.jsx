import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // To navigate after successful login
import axios from 'axios';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Navigate hook to redirect after login

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);  // Set loading state while waiting for the API response
    setError('');  // Clear previous error

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/login`,  // Backend login API
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',  // Sending JSON data
          },
        }
      );

      // On successful login, store the JWT token in localStorage
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redirect to user home page (or wherever you want)
      navigate('/user/home');
      
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or server error. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
      
      {/* Display error messages */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Link to Sign Up page (if needed) */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account? <a href="/user/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
