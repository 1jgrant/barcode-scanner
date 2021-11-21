import React from "react";

const Log = ({ scanHistory }) => {
  const entry = (entryData) => {
    return (
      <div key={entryData.code} className="fakeTableRow">
        <span>{entryData.code}</span>
        <span>{entryData.startTime}</span>
        <span>{entryData.endTime}</span>
        <span>{entryData.duration}</span>
      </div>
    );
  };

  return (
    <div>
      <section className="fakeTableHeader">
        <span>Code</span>
        <span>Start</span>
        <span>End</span>
        <span>Duration</span>
      </section>
      {scanHistory.map((scanData) => {
        return entry(scanData);
      })}
    </div>
  );
};

export default Log;
