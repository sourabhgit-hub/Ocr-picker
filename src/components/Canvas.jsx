import React, { useEffect, useRef, useState } from "react";

function Canvas({ uploadedImage, activeField, setFormData }) {
  const [rectangles, setRectangles] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

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

    canvas.width = image.width;
    canvas.height = image.height;

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
    const image = imageRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    rectangles.forEach((rectData) => {
      if (
        mouseX >= rectData.x &&
        mouseX <= rectData.x + rectData.w &&
        mouseY >= rectData.y &&
        mouseY <= rectData.y + rectData.h
      ) {
        if (activeField) {
          setFormData((prevData) => ({
            ...prevData,
            [activeField]: rectData.text,
          }));
        }
      }
    });
  };

  return (
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
  );
}

export default Canvas;
