import { useState } from "react";
import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";

const App = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="App">
      <Header resetScan={setIsScanning} />
      <Route path="/">
        <Scanner
          setScanHistory={setScanHistory}
          isScanning={isScanning}
          setIsScanning={setIsScanning}
        />
        <div className="results">
          {scanHistory.map((item, index) => {
            return (
              <span>
                {index}:{item.code} - {item.timeStamp}
              </span>
            );
          })}
        </div>
      </Route>
      <Route path="/log">
        <Log />
      </Route>
    </div>
  );
};

export default App;
