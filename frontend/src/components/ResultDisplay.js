import React from "react";

function ResultDisplay({ resultUrl }) {
  return (
    <div style={{ marginTop: 20 }}>
      {resultUrl ? (
        <>
          <h3>Stylized Image</h3>
          <img
            src={resultUrl}
            alt="Stylized Result"
            style={{ maxWidth: "100%", borderRadius: 8, border: "1px solid #ccc" }}
          />
          <br />
          <a href={resultUrl} download="stylized.png">
            <button style={{ marginTop: 10 }}>Download</button>
          </a>
        </>
      ) : (
        <div style={{ color: "#888", marginTop: 20 }}>
          Stylized image will appear here.
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
