import { useState } from "react";
import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";
import ScanInfo from "./components/ScanInfo";
import { formatScanData } from "./utils/dataUtils";

const App = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastDetected, setLastDetected] = useState({});
  const [recentDetection, setRecentDetection] = useState(false);
  const detectionTimeout = 5000;

  const updateScanHistory = (newScan) => {
    const newScanHistory = formatScanData(newScan, scanHistory);
    console.log(newScanHistory);
    setScanHistory(newScanHistory);
    const targetCode = newScan.code;
    const newScanData = newScanHistory.find(
      (record) => record.code === targetCode
    );
    updateLastDetection(newScanData);
  };

  const updateIsScanning = (newIsScanning) => {
    setIsScanning(newIsScanning);
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
      <Header updateIsScanning={updateIsScanning} />
      <Route path="/">
        <section className="scan-section">
          <Scanner
            updateIsScanning={updateIsScanning}
            updateScanHistory={updateScanHistory}
            isScanning={isScanning}
          />
          <ScanInfo
            recentDetection={recentDetection}
            lastDetected={lastDetected}
          />
        </section>
      </Route>
      <Route path="/log">
        <Log scanHistory={scanHistory} />
      </Route>
    </div>
  );
};

export default App;
