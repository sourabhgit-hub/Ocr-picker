import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ImageUploader from './components/ImageUploader';
import ImageViewer from './components/ImageViewer';
import WorldMap from "./components/map/WorldMap";
 
function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<ImageUploader setUploadedImage={setUploadedImage} />}
          />
          <Route
            path="/output"
            element={<ImageViewer uploadedImage={uploadedImage} />}
          />
          <Route
            path="/map"
            element={<WorldMap />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;