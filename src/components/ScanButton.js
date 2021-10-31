import React from "react";

const ScanButton = ({ isScanning, toggleScanning }) => {
  return (
    <button onClick={toggleScanning} className="scanBtn startBtn">
      {isScanning ? "Stop" : "Start"}
    </button>
  );
};

export default ScanButton;
