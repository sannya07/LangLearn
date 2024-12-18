import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  const { user, courses } = userData;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* User Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
            <p className="text-gray-600">
              <span className="font-semibold">Name: </span>
              {user.name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Username: </span>
              {user.username}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
          </div>

          {/* Courses */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Courses Enrolled</h3>
            {courses && courses.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600">
                {courses.map((course, index) => (
                  <li key={index} className="py-1">
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have not enrolled in any courses yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
