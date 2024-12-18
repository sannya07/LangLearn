import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstructorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;

    // Check for empty fields
    if (!name || !username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/instructor/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful signup, redirect to instructor dashboard or login
        localStorage.setItem("token", data.token); // Store the JWT token
        navigate("/instructor/home"); // Redirect to instructor's dashboard
      } else {
        // Show error message from the backend
        setError(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Error during signup, please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Instructor Signup</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            placeholder="Choose a unique username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default InstructorSignup;
