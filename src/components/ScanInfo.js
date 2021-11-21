import React from "react";

const ScanInfo = ({ recentDetection, lastDetected }) => {
  console.log(lastDetected);

  const findTargetTimestamp = (lastDetected) => {
    const { startTimestamp, endTimestamp, duration } = lastDetected;
    const isFinished = endTimestamp ? true : false;
    if (isFinished) {
      return (
        <div>
          <span>End Time: </span>
          <span>{endTimestamp}</span>
          <span>{duration}</span>
        </div>
      );
    }
    return (
      <div>
        <span>Start Time: </span>
        <span>{startTimestamp}</span>
      </div>
    );
  };

  if (recentDetection) {
    return (
      <div className="scanInfo">
        <span>Code: {lastDetected.code}</span>
        {findTargetTimestamp(lastDetected)}
      </div>
    );
  }
  return <></>;
};

export default ScanInfo;
