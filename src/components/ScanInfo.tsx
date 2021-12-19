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
  const findTargetTimestamp = (lastDetected: SingleScanData) => {
    const { startTime, endTime, duration } = lastDetected;
    const isFinished = endTime ? true : false;
    if (isFinished) {
      return (
        <>
          <div className="infoLine">
            <span>End Time: </span>
            <span>{endTime}</span>
          </div>
          <div className="infoLine">
            <span>Duration: </span>
            <span>{duration}</span>
          </div>
        </>
      );
    }
    return (
      <div className="infoLine">
        <span>Start Time: </span>
        <span>{startTime}</span>
      </div>
    );
  };

  if (recentDetection) {
    return (
      <div className="scanInfo">
        <div className="infoLine">
          <span>Code: </span>
          <span>{lastDetected ? `${lastDetected.code}` : ""}</span>
        </div>
        {lastDetected ? findTargetTimestamp(lastDetected) : ""}
      </div>
    );
  }
  return <></>;
};

export default ScanInfo;
