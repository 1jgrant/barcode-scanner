import Quagga from "@ericblade/quagga2";

export const startScanning = (updateIsScanning, updateScanHistory, width) => {
  const widthConstraint = width < 640 ? width : 640;
  const heightConstraint = width;
  Quagga.init(
    {
      frequency: 2,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          width: widthConstraint,
          height: heightConstraint,
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
      Quagga.start();
    }
  );
  updateIsScanning(true);
  Quagga.onProcessed((barcodeData) => handleBarcodeProcessed(barcodeData));
  Quagga.onDetected((barcodeData) =>
    handleBarcodeDetected(
      barcodeData,
      updateIsScanning,
      updateScanHistory,
      width
    )
  );
};

export const handleBarcodeProcessed = (barcodeData) => {
  let drawingCtx = Quagga.canvas.ctx.overlay;
  let drawingCanvas = Quagga.canvas.dom.overlay;
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
      Quagga.ImageDebug.drawPath(barcodeData.box, { x: 0, y: 1 }, drawingCtx, {
        color: "blue",
        lineWidth: 2,
      });
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

export const handleBarcodeDetected = (
  barcodeData,
  updateIsScanning,
  updateScanHistory,
  width
) => {
  const cameraFeed = document.getElementById("interactive");
  cameraFeed.getElementsByTagName("video")[0].pause();
  Quagga.stop();
  Quagga.offDetected();
  Quagga.offProcessed();
  const newScanLog = {
    code: barcodeData.codeResult.code,
    timestamp: Date.now(),
  };
  updateScanHistory(newScanLog);
  setTimeout(() => {
    startScanning(updateIsScanning, updateScanHistory, width);
  }, 200);
};

export const stopScanning = (updateIsScanning) => {
  Quagga.stop();
  Quagga.offDetected();
  Quagga.offProcessed();
  updateIsScanning(false);
};
