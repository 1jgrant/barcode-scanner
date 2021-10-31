import { useState } from "react";
import ScanButton from "./ScanButton";
import { startScanning, stopScanning } from "../utils/scannerUtils";

const Scanner = ({ setScanHistory, isScanning, setIsScanning }) => {
  //   const [isScanning, setIsScanning] = useState(false);

  const toggleScanning = (event) => {
    const cameraFeed = document.getElementById("interactive");
    const cameraPlaceholder = document.getElementById("cameraPlaceholder");
    const button = event.target;
    if (isScanning) {
      stopScanning(setIsScanning);
      button.className = "scanBtn startBtn";
      cameraFeed.style.display = "none";
      cameraPlaceholder.style.display = "";
    } else {
      startScanning(setIsScanning, setScanHistory);
      button.className = "scanBtn stopBtn";
      cameraFeed.style.display = "";
      cameraPlaceholder.style.display = "none";
    }
  };

  return (
    <div>
      <ScanButton isScanning={isScanning} toggleScanning={toggleScanning} />
      <div id="interactive" className="viewport"></div>
      <div id="cameraPlaceholder">📷</div>
    </div>
  );
};

export default Scanner;
