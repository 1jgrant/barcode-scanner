import ScanButton from "./ScanButton";
import { startScanning, stopScanning } from "../utils/scannerUtils";
import { useViewport } from "../hooks/useViewport";

const Scanner = ({ updateIsScanning, updateScanHistory, isScanning }) => {
  const { width } = useViewport();
  const imgHeight = width;

  const toggleScanning = (event) => {
    const cameraFeed = document.getElementById("interactive");
    const cameraPlaceholder = document.getElementById("cameraPlaceholder");
    const button = event.target;
    if (isScanning) {
      stopScanning(updateIsScanning);
      button.className = "scanBtn startBtn";
      cameraFeed.style.display = "none";
      cameraPlaceholder.style.display = "";
    } else {
      startScanning(updateIsScanning, updateScanHistory, width);
      button.className = "scanBtn stopBtn";
      cameraFeed.style.display = "";
      cameraPlaceholder.style.display = "none";
    }
  };

  console.log("Scanner>> ", width, imgHeight);
  return (
    <div className="scanner-container">
      <ScanButton isScanning={isScanning} toggleScanning={toggleScanning} />
      <div
        id="interactive"
        className="viewport"
        style={{ maxHeight: imgHeight }}
      ></div>
      <div id="cameraPlaceholder" style={{ minHeight: width }}>
        📷
      </div>
    </div>
  );
};

export default Scanner;
