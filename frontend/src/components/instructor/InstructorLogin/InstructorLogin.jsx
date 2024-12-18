import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    // Make sure username and password are not empty
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/instructor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to the instructor dashboard after successful login
        navigate('/instructor/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Instructor Login</h2>
        
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-900 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/instructor/signup" className="text-green-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default InstructorLogin;
