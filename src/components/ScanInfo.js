import React from "react";

const ScanInfo = ({ recentDetection, lastDetected }) => {
  console.log(lastDetected);

  const findTargetTimestamp = (lastDetected) => {
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
        <span>Code: {lastDetected.code}</span>
        {findTargetTimestamp(lastDetected)}
      </div>
    );
  }
  return <></>;
};

export default ScanInfo;
