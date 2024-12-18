import React, { useState, useEffect } from 'react';

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses || []);
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError('An error occurred while fetching courses');
      }
    };

    fetchCourses();
  }, [token]);

  // Handle enrollment in a course
  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentMessage(data.message || 'Successfully enrolled in the course');
        // Update the local state to reflect the enrollment
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId
              ? { ...course, studentsEnrolled: [...course.studentsEnrolled, 'You'] } // Placeholder for the current user
              : course
          )
        );
      } else {
        setError(data.message || 'Failed to enroll in the course');
      }
    } catch (err) {
      setError('An error occurred while enrolling in the course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {enrollmentMessage && <div className="text-green-500 mb-4">{enrollmentMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-gray-500 text-sm">By: {course.courseBy}</p>
            <p className="text-gray-500 text-sm">Price: ${course.price}</p>
            <p className="text-gray-500 text-sm">
              Enrolled: {course.studentsEnrolled.length}{' '}
              {course.studentsEnrolled.length === 1 ? 'student' : 'students'}
            </p>
            <button
              onClick={() => handleEnroll(course._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCourses;
