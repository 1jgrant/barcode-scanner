type ScanButtonProps = {
  isScanning: Boolean;
  toggleScanning: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) => void;
};

const ScanButton = ({
  isScanning,
  toggleScanning,
}: ScanButtonProps): JSX.Element => {
  return (
    <button onClick={toggleScanning} className="scanBtn startBtn">
      {isScanning ? "Stop" : "Start"}
    </button>
  );
};

export default ScanButton;
