import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import StylePicker from "./components/StylePicker";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [style, setStyle] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


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
    setLoading(true);
    setError('');
    setResultUrl(null);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('style', style);

    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        setError('Error processing image. Please try again.');
        setLoading(false);
        return;
      }
      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError('Failed to connect to backend.');
    }
    setLoading(false);
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
        disabled={!image || !style || loading}
        style={{
          padding: "10px 24px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: (!image || !style || loading) ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Stylizing..." : "Stylize!"}
      </button>
      {loading && (
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <span className="spinner" style={{ fontSize: 32 }}>⏳</span>
          <div>Stylizing your image...</div>
        </div>
      )}
      {error && (
        <div style={{ color: "red", margin: "20px 0", textAlign: "center" }}>
          {error}
        </div>
      )}
      <ResultDisplay resultUrl={resultUrl} />
    </div>
  );
}

export default App;
