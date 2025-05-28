import React from "react";
import styles from "../styles";

function StylePicker({ selectedStyle, onSelectStyle }) {
  return (
    <div>
      <h3>Pick a Style</h3>
      <div style={{ display: "flex", gap: 16 }}>
        {styles.map((style) => (
          <div key={style.file} style={{ textAlign: "center" }}>
            <img
              src={process.env.PUBLIC_URL + "/styles/" + style.file}
              alt={style.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
                border:
                  selectedStyle === style.file
                    ? "3px solid #007bff"
                    : "1px solid #ccc",
                cursor: "pointer",
                boxShadow:
                  selectedStyle === style.file
                    ? "0 0 8px #007bff"
                    : "none",
              }}
              onClick={() => onSelectStyle(style.file)}
            />
            <div style={{ fontSize: 12, marginTop: 4 }}>{style.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StylePicker;
