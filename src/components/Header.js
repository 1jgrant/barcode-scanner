import React from "react";
import { Link } from "wouter";

const Header = () => {
  return (
    <div className="App-header">
      <Link href="/" className="App-link">
        Scan
      </Link>
      <Link href="/log" className="App-link">
        log
      </Link>
    </div>
  );
};

export default Header;
