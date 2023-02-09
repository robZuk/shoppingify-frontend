import React from "react";

function CancelButton({ text, onClick }) {
  return (
    <button className="cancel-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default CancelButton;
