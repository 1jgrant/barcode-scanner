import { useState } from "react";
import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";
import { NewScanObj } from "./components/Scanner";
import ScanInfo from "./components/ScanInfo";
import type { SingleScanData } from "./components/ScanInfo";
import { formatScanData } from "./utils/dataUtils";

const App = (): JSX.Element => {
  const [scanHistory, setScanHistory] = useState<SingleScanData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastDetected, setLastDetected] = useState<SingleScanData | null>(null);
  const [recentDetection, setRecentDetection] = useState(false);
  const detectionTimeout = 5000;

  const updateScanHistory = (newScan: NewScanObj) => {
    const newScanHistory = formatScanData(newScan, scanHistory);
    setScanHistory(newScanHistory);
    const targetCode = newScan.code;
    const newScanData = newScanHistory.find(
      (record) => record.code === targetCode
    );
    if (newScanData) {
      updateLastDetection(newScanData);
    }
  };

  const updateIsScanning = (newIsScanning: boolean) => {
    setIsScanning(newIsScanning);
  };

  const updateLastDetection = (newScan: SingleScanData) => {
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
