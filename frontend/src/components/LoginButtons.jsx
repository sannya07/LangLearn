import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const LoginButtons = () => {
    const navigate = useNavigate();
  return (
    <>
    
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-8">Choose Your Login Option</h1>
      <div className="flex space-x-6">
        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-md shadow-lg transition duration-300"
          onClick={() => navigate("/user/login")}
          >
          User Login
        </button>
        <button
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-lg font-medium rounded-md shadow-lg transition duration-300"
          onClick={() => navigate("/instructor/login")}
          >
          Instructor Login
        </button>
      </div>
    </div>
    <Footer/>
            </>
  );
};

export default LoginButtons;
