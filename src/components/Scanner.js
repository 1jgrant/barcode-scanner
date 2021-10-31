import React, { useState } from "react";
import Quagga from "@ericblade/quagga2";
import ScanButton from "./ScanButton";

const Scanner = () => {
  const [scannedItems, setScannedItems] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = () => {
    const width =
      window.innerWidth ||
      document.documentElement ||
      document.body.clientWidth;
    const widthConstraint = width < 640 ? width : 640;
    Quagga.init(
      {
        frequency: 2,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            width: widthConstraint,
            height: 480,
          },
          locate: true,
          decoder: {
            readers: ["code_128_reader"],
            debug: {
              showCanvas: true,
              showPatches: true,
              showFoundPatches: true,
              showSkeleton: true,
              showLabels: true,
              showPatchLabels: true,
              showRemainingPatchLabels: true,
              boxFromPatches: {
                showTransformed: true,
                showTransformedBox: true,
                showBB: true,
              },
            },
          },
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Quagga initialised");
        Quagga.start();
      }
    );
    setIsScanning(true);
    Quagga.onProcessed(handleBarcodeProcessed);
    Quagga.onDetected(handleBarcodeDetected);
  };

  const handleBarcodeProcessed = (barcodeData) => {
    let drawingCtx = Quagga.canvas.ctx.overlay;
    let drawingCanvas = Quagga.canvas.dom.overlay;
    console.log(barcodeData);
    if (barcodeData) {
      if (barcodeData.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute("width")),
          parseInt(drawingCanvas.getAttribute("height"))
        );
        barcodeData.boxes
          .filter((box) => {
            return box !== barcodeData.box;
          })
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: "green",
              lineWidth: 2,
            });
          });
      }
      if (barcodeData.box) {
        Quagga.ImageDebug.drawPath(
          barcodeData.box,
          { x: 0, y: 1 },
          drawingCtx,
          { color: "blue", lineWidth: 2 }
        );
      }
      if (barcodeData.codeResult && barcodeData.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          barcodeData.line,
          { x: "x", y: "y" },
          drawingCtx,
          { color: "red", lineWidth: 3 }
        );
      }
    }
  };

  const handleBarcodeDetected = (barcodeData) => {
    const cameraFeed = document.getElementById("interactive");
    cameraFeed.getElementsByTagName("video")[0].pause();
    Quagga.pause();
    const detectedCode = barcodeData.codeResult.code;
    setScannedItems((currentItems) => [...currentItems, detectedCode]);
    setTimeout(() => {
      startScanning();
    }, 3000);
  };

  const stopScanning = () => {
    Quagga.stop();
    Quagga.offProcessed();
    setIsScanning(false);
  };

  const toggleScanning = (event) => {
    const button = event.target;
    console.log(button);
    if (isScanning) {
      stopScanning();
      button.className = "scanBtn startBtn";
    } else {
      startScanning();
      button.className = "scanBtn stopBtn";
    }
  };

  return (
    <div>
      <ScanButton isScanning={isScanning} toggleScanning={toggleScanning} />
      <div id="interactive" className="viewport"></div>
      <div>
        {scannedItems.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
    </div>
  );
};

export default Scanner;
