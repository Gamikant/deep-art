import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import StylePicker from "./components/StylePicker";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [style, setStyle] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResultUrl(null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleStyleSelect = (styleFile) => {
    setStyle(styleFile);
    setResultUrl(null);
  };

  // Placeholder for backend integration
  const handleStylize = async () => {
    if (!image || !style) return;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('style', style);

    setResultUrl(null); // Clear previous result
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        alert('Error processing image.');
        return;
      }
      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Failed to connect to backend.');
    }
  };


  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Deep Art Style Transfer</h1>
      <ImageUpload onImageChange={handleImageChange} previewUrl={previewUrl} />
      <div style={{ margin: "20px 0" }}>
        <StylePicker selectedStyle={style} onSelectStyle={handleStyleSelect} />
      </div>
      <button
        onClick={handleStylize}
        disabled={!image || !style}
        style={{
          padding: "10px 24px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: image && style ? "pointer" : "not-allowed",
        }}
      >
        Stylize!
      </button>
      <ResultDisplay resultUrl={resultUrl} />
    </div>
  );
}

export default App;
