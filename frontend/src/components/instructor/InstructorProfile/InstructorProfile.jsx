import React, { useState, useEffect } from 'react';

function InstructorProfile() {
  const [instructorData, setInstructorData] = useState(null);
  const [error, setError] = useState('');

  // Fetch instructor data when the component mounts
  useEffect(() => {
    const fetchInstructorData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/instructor/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setInstructorData(data);
        } else {
          setError(data.message || 'Failed to fetch instructor data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };

    fetchInstructorData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!instructorData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  const { name, username, email, selfCourses, rating } = instructorData;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Instructor Profile</h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Instructor Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
            <p className="text-gray-600">
              <span className="font-semibold">Name: </span>
              {name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Username: </span>
              {username}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email: </span>
              {email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rating: </span>
              {rating}
            </p>
          </div>

          {/* Courses Created */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Courses Created</h3>
            {selfCourses && selfCourses.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600">
                {selfCourses.map((courseId, index) => (
                  <li key={index} className="py-1">
                    {courseId}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have not created any courses yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfile;
