import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ImageUploader({ setUploadedImage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setUploadedImage(URL.createObjectURL(selectedFile));
        navigate("/output");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-medium mb-4">Upload Bill Image</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUploader;
