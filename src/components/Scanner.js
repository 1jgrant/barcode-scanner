import React, { useState } from "react";
import Quagga from "@ericblade/quagga2";

const Scanner = () => {
  const [scannedItems, setScannedItems] = useState([]);

  const startScanning = () => {
    const width =
      window.innerWidth ||
      document.documentElement ||
      document.body.clientWidth;
    let widthConstraint = 640;
    if (width < 640) {
      widthConstraint = width;
    }
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
  };

  return (
    <div>
      <button onClick={startScanning}>Start</button>
      <button onClick={stopScanning}>Stop</button>
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
