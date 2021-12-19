import React from "react";

export type SingleScanData = {
  code: string;
  startTimestamp: number;
  startTime: string;
  endTimestamp: number | null;
  endTime: string | null;
  duration: string | null;
};

type ScanInfoProps = {
  recentDetection: boolean;
  lastDetected: SingleScanData | null;
};

const ScanInfo = ({ recentDetection, lastDetected }: ScanInfoProps) => {
  console.log(lastDetected);

  const findTargetTimestamp = (lastDetected: SingleScanData) => {
    const { startTime, endTime, duration } = lastDetected;
    const isFinished = endTime ? true : false;
    if (isFinished) {
      return (
        <>
          <>
            <span>End Time: </span>
            <span>{endTime}</span>
          </>
          <>
            <span>Duration: </span>
            <span>{duration}</span>
          </>
        </>
      );
    }
    return (
      <div>
        <span>Start Time: </span>
        <span>{startTime}</span>
      </div>
    );
  };

  if (recentDetection) {
    return (
      <div className="scanInfo">
        <span>Code: {lastDetected ? lastDetected.code : ""}</span>
        {lastDetected ? findTargetTimestamp(lastDetected) : ""}
      </div>
    );
  }
  return <></>;
};

export default ScanInfo;
