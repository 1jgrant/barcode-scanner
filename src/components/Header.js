import React from "react";
import { Link } from "wouter";

const Header = () => {
  return (
    <div className="App-header">
      <Link href="/">
        <a className="App-link">Scan</a>
      </Link>
      <Link href="/log">
        <a className="App-link">log</a>
      </Link>
    </div>
  );
};

export default Header;
