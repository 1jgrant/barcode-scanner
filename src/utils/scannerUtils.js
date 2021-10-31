import Quagga from "@ericblade/quagga2";

export const startScanning = (setIsScanning, setScanHistory) => {
  const width =
    window.innerWidth || document.documentElement || document.body.clientWidth;
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
  Quagga.onProcessed((barcodeData) => handleBarcodeProcessed(barcodeData));
  Quagga.onDetected((barcodeData) =>
    handleBarcodeDetected(barcodeData, setScanHistory, setIsScanning)
  );
};

export const handleBarcodeProcessed = (barcodeData) => {
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
  setScanHistory,
  setIsScanning
) => {
  const cameraFeed = document.getElementById("interactive");
  cameraFeed.getElementsByTagName("video")[0].pause();
  Quagga.stop();
  Quagga.offDetected();
  Quagga.offProcessed();
  const newScanLog = {
    code: barcodeData.codeResult.code,
    timeStamp: Date.now(),
  };
  setScanHistory((currentItems) => [...currentItems, newScanLog]);
  setTimeout(() => {
    startScanning(setIsScanning, setScanHistory);
  }, 3000);
};

export const stopScanning = (setIsScanning) => {
  Quagga.stop();
  Quagga.offDetected();
  Quagga.offProcessed();
  setIsScanning(false);
};
