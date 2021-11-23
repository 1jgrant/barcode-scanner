import { useState } from "react";
import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";
import ScanInfo from "./components/ScanInfo";
import { formatScanData } from "./utils/dataUtils";

const dummyLastDetected = {
  code: "B3189321",
  startTimestamp: 1637531751507,
  startTime: "21:55:51",
  endTimestamp: 1637531898959,
  endTime: "21:58:18",
  duration: "00:02:27",
};

const dummyScanHistory = [
  {
    code: "A4940154",
    startTimestamp: 1637531519431,
    startTime: "21:51:59",
    endTimestamp: null,
    endTime: null,
    duration: null,
  },
  {
    code: "B3189321",
    startTimestamp: 1637531751507,
    startTime: "21:55:51",
    endTimestamp: 1637531898959,
    endTime: "21:58:18",
    duration: "00:02:27",
  },
  {
    code: "X8400339",
    startTimestamp: 1637531823573,
    startTime: "21:57:03",
    endTimestamp: null,
    endTime: null,
    duration: null,
  },
];

const App = () => {
  const [scanHistory, setScanHistory] = useState(dummyScanHistory);
  const [isScanning, setIsScanning] = useState(false);
  const [lastDetected, setLastDetected] = useState(dummyLastDetected);
  const [recentDetection, setRecentDetection] = useState(true);
  const detectionTimeout = 3000;

  const updateScanHistory = (newScan) => {
    const newScanHistory = formatScanData(newScan, scanHistory);
    console.log(newScanHistory);
    setScanHistory(newScanHistory);
    setLastDetected(newScan);
    updateLastDetection(newScan);
  };

  const updateIsScanning = (isScanning) => {
    setIsScanning(isScanning);
  };

  const updateLastDetection = (newScan) => {
    setLastDetected(newScan);
    setRecentDetection(true);
    setTimeout(() => {
      setRecentDetection(false);
    }, detectionTimeout);
  };

  return (
    <div className="App">
      <Header resetScan={updateIsScanning} />
      <Route path="/">
        <Scanner
          updateIsScanning={updateIsScanning}
          updateScanHistory={updateScanHistory}
          isScanning={isScanning}
        />
        <ScanInfo
          recentDetection={recentDetection}
          lastDetected={lastDetected}
        />
      </Route>
      <Route path="/log">
        <Log scanHistory={scanHistory} />
      </Route>
    </div>
  );
};

export default App;
