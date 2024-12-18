import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorHome() {
  const [instructorData, setInstructorData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch instructor data on page load
  useEffect(() => {
    const fetchInstructorData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/instructor/login');
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
          // Ensure selfCourses is always an array (default to empty if undefined or null)
          data.selfCourses = Array.isArray(data.selfCourses) ? data.selfCourses : [];
          setInstructorData(data);
        } else {
          setError(data.message || 'Failed to fetch instructor data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };

    fetchInstructorData();
  }, [navigate]);

  // Display a loading message while data is being fetched
  if (!instructorData && !error) {
    return <div>Loading...</div>;
  }

  // Handle error case
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Instructor Dashboard</h2>

      {/* Display Instructor's Information */}
      {instructorData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-xl font-bold">Name: {instructorData.name}</h3>
            <p className="text-gray-600">Username: {instructorData.username}</p>
            <p className="text-gray-600">Email: {instructorData.email}</p>
          </div>

          {/* Display Instructor Rating */}
          <div className="mb-4">
            <p className="font-semibold">Rating: {instructorData.rating}</p>
          </div>

          {/* Display Instructor's SelfCourses */}
          <div className="mb-4">
            <h4 className="font-semibold">Your Courses</h4>
            {instructorData.selfCourses.length > 0 ? (
              <ul className="list-disc pl-5">
                {instructorData.selfCourses.map((course, index) => (
                  <li key={index} className="text-gray-700">
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have no courses yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorHome;
