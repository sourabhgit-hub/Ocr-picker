import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Fields from "./Fields";
import ImageCanvas from "./Canvas";

function ImageViewer({ uploadedImage }) {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    unit: "",
    financial_year: "",
  });
  const [activeField, setActiveField] = useState(null);

  const handleInputFocus = (field) => {
    setActiveField(field);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/output",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sent JSON Object:", jsonData);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="md:w-1/2 pr-4">
            <Link
              to="/"
              className="mb-4 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Upload Another Image
            </Link>
          </div>
          <ImageCanvas
            uploadedImage={uploadedImage}
            activeField={activeField}
            setFormData={setFormData}
          />
        </div>
        <div className="hidden md:block w-px bg-gray-200 mx-4"></div>
        <Fields
          formData={formData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ImageViewer;
