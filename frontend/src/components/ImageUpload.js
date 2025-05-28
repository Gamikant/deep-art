import React from "react";

function ImageUpload({ onImageChange, previewUrl }) {
  return (
    <div>
      <input type="file" accept="image/*" onChange={onImageChange} />
      {previewUrl && (
        <div style={{ marginTop: 10 }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: 200, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
