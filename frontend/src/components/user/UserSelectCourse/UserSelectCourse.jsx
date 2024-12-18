import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// List of courses (you can dynamically fetch this data from an API if needed)
const courses = [
  {
    id: 1,
    title: 'Course 1',
    instructor: 'Instructor A',
    duration: '6 Weeks',
    description: 'This is a detailed description for Course 1. You will learn the basics of programming and problem-solving.',
    imageUrl: 'https://via.placeholder.com/600x300/FF5733/FFFFFF?text=Course+1',
  },
  {
    id: 2,
    title: 'Course 2',
    instructor: 'Instructor B',
    duration: '8 Weeks',
    description: 'This course focuses on advanced topics such as algorithms, data structures, and system design.',
    imageUrl: 'https://via.placeholder.com/600x300/33FF57/FFFFFF?text=Course+2',
  },
  {
    id: 3,
    title: 'Course 3',
    instructor: 'Instructor C',
    duration: '10 Weeks',
    description: 'An in-depth exploration of front-end development, including HTML, CSS, and JavaScript.',
    imageUrl: 'https://via.placeholder.com/600x300/5733FF/FFFFFF?text=Course+3',
  },
  {
    id: 4,
    title: 'Course 4',
    instructor: 'Instructor D',
    duration: '12 Weeks',
    description: 'Learn about back-end technologies such as Node.js, databases, and REST APIs.',
    imageUrl: 'https://via.placeholder.com/600x300/FFFF33/FFFFFF?text=Course+4',
  },
  {
    id: 5,
    title: 'Course 5',
    instructor: 'Instructor E',
    duration: '14 Weeks',
    description: 'Master full-stack development with this comprehensive course covering both front-end and back-end skills.',
    imageUrl: 'https://via.placeholder.com/600x300/FF33FF/FFFFFF?text=Course+5',
  },
];

const UserSelectCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate from React Router

  // Handle course selection
  const handleCourseSelection = (courseId) => {
    setSelectedCourse(courseId);
    setError(''); // Clear any error when a course is selected
    setSuccess(''); // Clear success message
  };

  // Handle final course selection submission
  const handleSubmitSelection = async () => {
    if (!selectedCourse) {
      setError('Please select a course first.');
      return;
    }

    const token = localStorage.getItem('token');  // Ensure you have the token saved in localStorage
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/select-course`, 
        { courseId: selectedCourse }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Attach the JWT token here
            'Content-Type': 'application/json',
          },
          withCredentials: true,  // This ensures cookies are sent if needed
        }
      );
  
      console.log('Course selected successfully:', response.data);
      setSuccess('Course selected successfully!');
      setError(''); // Clear any previous error message
      
      // Navigate to "/user/home" after successful course selection
      navigate('/user/home');
      
    } catch (error) {
      console.error('Error selecting course:', error);
      setError('Error selecting course. Please try again.');
      setSuccess(''); // Clear success message in case of error
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Select a Course</h2>

      {/* Display error or success messages */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {/* Display Courses List */}
      <div className="w-full max-w-4xl px-4 mb-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`bg-white p-6 rounded-lg shadow-lg mb-6 ${selectedCourse === course.id ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleCourseSelection(course.id)}
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.instructor}</p>
            <p className="text-gray-500 mt-1">{course.duration}</p>

            {/* Course Information Section */}
            {selectedCourse === course.id && (
              <div className="mt-4">
                <h4 className="text-xl font-bold mb-2">Course Information</h4>
                <p className="text-gray-700">{course.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitSelection}
        className="w-full max-w-md py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700"
      >
        Select Course
      </button>
    </div>
  );
};

export default UserSelectCourse;
