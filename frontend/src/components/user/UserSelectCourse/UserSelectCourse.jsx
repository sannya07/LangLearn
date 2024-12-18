import React, { useState } from 'react';

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
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Select a Course</h2>

      {/* Display Courses List */}
      <div className="w-full max-w-4xl px-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => handleSelectCourse(course.id)}
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

      {/* If no course is selected */}
      {!selectedCourse && (
        <p className="text-gray-500 mt-4">Click on a course to see more details and select it.</p>
      )}

      {/* If a course is selected */}
      {selectedCourse && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center mt-8">
          <h3 className="text-2xl font-bold mb-4">{courses[selectedCourse - 1].title}</h3>
          <p className="text-gray-600 mb-4">{courses[selectedCourse - 1].description}</p>
          <button
            onClick={() => alert('Course selected')}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Select Course
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSelectCourse;
