import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ImageViewer({ uploadedImage }) {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    unit: "",
    financial_year: "",
  });
  const [inputs, setInputs] = useState([]);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  useEffect(() => {
    fetchRectangles();
  }, []);

  useEffect(() => {
    if (rectangles.length > 0 && imageRef.current) {
      resizeCanvas();
    }
  }, [rectangles]);

  const fetchRectangles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/static/rectangles.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      setRectangles(data);
    } catch (error) {
      console.error("Error loading rectangles:", error);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const container = canvas.parentElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const scaleX = image.width / image.naturalWidth;
    const scaleY = image.height / image.naturalHeight;

    drawRectangles(scaleX, scaleY);
  };

  const drawRectangles = (scaleX, scaleY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;

    rectangles.forEach((rect) => {
      const scaledRect = {
        x: rect.x * scaleX,
        y: rect.y * scaleY,
        width: rect.w * scaleX,
        height: rect.h * scaleY,
        text: rect.text,
      };

      ctx.fillStyle = "rgba(255, 255, 113, 0.5)";
      ctx.fillRect(
        scaledRect.x - 2,
        scaledRect.y - 2,
        scaledRect.width + 2,
        scaledRect.height + 2
      );
    });
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    rectangles.forEach((rectData) => {
      if (
        mouseX >= rectData.x &&
        mouseX <= rectData.x + rectData.w &&
        mouseY >= rectData.y &&
        mouseY <= rectData.y + rectData.h
      ) {
        addInputField(rectData.text);
      }
    });
  };

  const addInputField = () => {
    setInputs([...inputs, { "": "" }]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const jsonData = JSON.stringify(formData); // Convert formData to JSON string

    
    try {
      const response = await axios.post(
        "http://localhost:5000/output", // Replace with your backend URL
        formData, // Still send the original formData object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sent JSON Object:", jsonData); // This logs the converted JSON
      console.log("Response from backend:", response.data); // Handle successful response
    } catch (error) {
      console.error("Error sending data to backend:", error); // Handle errors
    }
  };


  // const handleZoom = (factor) => {
  //   setZoom((prevZoom) => Math.max(0.1, Math.min(prevZoom + factor, 3)));
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="flex-1">
          <div className="md:w-1/2 pr-4">
            <Link
              to="/"
              className=" mb-4 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Upload Another Image
            </Link>
            {/* <div className="mb-4">
              <button
                onClick={() => handleZoom(0.1)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Zoom In
              </button>
              <button
                onClick={() => handleZoom(-0.1)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Zoom Out
              </button>
            </div> */}
          </div>
          <div id="image-container" className="relative">
            <img
              ref={imageRef}
              src={uploadedImage}
              alt="Uploaded Bill"
              className="max-w-full h-auto"
              onLoad={resizeCanvas}
            />
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="absolute top-0 left-0 w-full h-full cursor-pointer"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200 mx-4"></div>

        {/* Right side - Fields */}
        <div className="md:w-1/2 pl-4 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Fields</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="type" className="block mb-1">
                Type:
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block mb-1">
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="unit" className="block mb-1">
                Unit:
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="financial_year" className="block mb-1">
                Financial Year:
              </label>
              <input
                type="text"
                id="financial_year"
                name="financial_year"
                value={formData.financial_year}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
