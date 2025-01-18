import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SignupButtons = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white">
      <h1 className="text-3xl font-bold mb-8">Choose Your Signup Option</h1>
      <div className="flex space-x-6">
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-lg font-medium rounded-md shadow-lg transition duration-300"
          onClick={() => navigate("/user/signup")}
          >
          User Signup
        </button>
        <button
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-lg font-medium rounded-md shadow-lg transition duration-300"
          onClick={() => navigate("/instructor/signup")}
          >
          Instructor Signup
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignupButtons;
