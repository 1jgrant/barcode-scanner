import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";
import Scanner from "./components/Scanner";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/">
        <Scanner />
      </Route>
      <Route path="/log">
        <Log />
      </Route>
    </div>
  );
}

export default App;
