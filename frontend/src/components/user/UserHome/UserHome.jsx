import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [userInfo, setUserInfo] = useState(null); // To store user data
  const [courses, setCourses] = useState([]); // To store courses the user is enrolled in
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        // If there's no token, navigate the user to login page
        navigate('/user/login');
        return;
      }

      try {
        // Fetch user details using the token for authentication
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/home`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });

        // Set the fetched user data and course data
        setUserInfo(response.data.user);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Welcome, {userInfo.name}!</h2>

      {/* Display user info */}
      <div className="w-full max-w-4xl px-4 mb-6">
        <h3 className="text-xl font-semibold">Your Courses:</h3>
        {courses.length > 0 ? (
          <div className="mt-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-lg mb-6"
              >
                <h4 className="text-2xl font-semibold">{course.title}</h4>
                <p className="text-gray-600 mt-2">Instructor: {course.instructor}</p>
                <p className="text-gray-500 mt-1">Duration: {course.duration}</p>
                <p className="text-gray-700 mt-2">{course.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
