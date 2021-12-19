import { Link } from "wouter";
import { stopScanning } from "../utils/scannerUtils";

type HeaderProps = {
  updateIsScanning: (newIsScanning: boolean) => void;
};
const Header = ({ updateIsScanning }: HeaderProps): JSX.Element => {
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
        Log
      </Link>
    </div>
  );
};

export default Header;
