import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Log from "./components/Log";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/">Home</Route>
      <Route path="/log">
        <Log />
      </Route>
    </div>
  );
}

export default App;
