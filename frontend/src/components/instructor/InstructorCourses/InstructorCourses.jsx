import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission to create a course
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/instructor/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      if (image) {
        formData.append("image", image); // Append the image file
      }

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/instructor/create-course`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header for token
          },
          body: formData, // Use FormData to send the request
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        setError(data.message || "Failed to create course");
      }
    } catch (err) {
      setError("An error occurred while creating the course");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Course</h2>

      {/* Display success or error messages */}
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Course Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter course description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter course price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
            Course Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default InstructorCourses;
