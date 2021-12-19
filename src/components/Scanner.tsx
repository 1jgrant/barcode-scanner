import ScanButton from "./ScanButton";
import { startScanning, stopScanning } from "../utils/scannerUtils";
import { useViewport } from "../hooks/useViewport";
import React from "react";

export type NewScanObj = {
  code: string;
  timestamp: number;
};

type ScannerProps = {
  updateIsScanning: (newIsScanning: boolean) => void;
  updateScanHistory: (newScan: NewScanObj) => void;
  isScanning: boolean;
};

const Scanner = ({
  updateIsScanning,
  updateScanHistory,
  isScanning,
}: ScannerProps): JSX.Element => {
  const { width } = useViewport();
  const imgHeight = width;

  const toggleScanning = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) => {
    const cameraFeed = document.getElementById("interactive");
    const cameraPlaceholder = document.getElementById("cameraPlaceholder");
    const button = event.target;
    if (isScanning) {
      stopScanning(updateIsScanning);
      if (button instanceof Element) {
        button.className = "scanBtn startBtn";
      }
      if (cameraFeed) {
        cameraFeed.style.display = "none";
      }
      if (cameraPlaceholder) {
        cameraPlaceholder.style.display = "";
      }
    } else {
      startScanning(updateIsScanning, updateScanHistory, width);
      if (button instanceof Element) {
        button.className = "scanBtn stopBtn";
      }
      if (cameraFeed) {
        cameraFeed.style.display = "";
      }
      if (cameraPlaceholder) {
        cameraPlaceholder.style.display = "none";
      }
    }
  };

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
