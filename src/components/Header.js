import React from "react";
import { Link } from "wouter";
import { stopScanning } from "../utils/scannerUtils";

const Header = ({ updateIsScanning }) => {
  return (
    <div className="App-header">
      <Link href="/" className="App-link">
        Scan
      </Link>
      <Link
        href="/log"
        className="App-link"
        onClick={() => stopScanning(updateIsScanning)}
      >
        log
      </Link>
    </div>
  );
};

export default Header;
