import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorldMap from "./components/map/WorldMap";
import ImageUploader from "./components/pages/ImageUploader";
import ImageViewer from "./components/pages/ImageViewer";
import CRMIntegration from "./components/pages/CRM";

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
          <Route path="/map" element={<WorldMap />} />
          <Route path="/crm-integration" element={<CRMIntegration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
