import React from "react";

function ConfirmButton({ text, bgColor = "#f9a109", onClick }) {
  return (
    <button
      className="confirm-button"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ConfirmButton;
