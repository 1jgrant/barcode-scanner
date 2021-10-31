import { useState } from "react";
import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";

const App = () => {
  const [scanHistory, setScanHistory] = useState([]);

  return (
    <div className="App">
      <Header />
      <Route path="/">
        <Scanner setScanHistory={setScanHistory} />
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
