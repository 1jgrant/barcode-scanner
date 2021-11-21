export const formatScanData = (newScanLog, scanHistory) => {
  const { code, timestamp } = newScanLog;
  const newScanHistory = [...scanHistory];
  const targetRecord = newScanHistory.find((record) => record.code === code);
  if (targetRecord) {
    if (targetRecord.startTimestamp) {
      targetRecord.endTimestamp = timestamp;
      targetRecord.endTime = timestampToTimeString(timestamp);
      targetRecord.duration = getDuration(
        targetRecord.startTimestamp,
        timestamp
      );
      return newScanHistory;
    }
    targetRecord.startTimestamp = timestamp;
    return newScanHistory;
  }
  const newScanObj = {
    code: code,
    startTimestamp: timestamp,
    startTime: timestampToTimeString(timestamp),
    endTimestamp: null,
    endTime: null,
    duration: null,
  };
  newScanHistory.push(newScanObj);
  return newScanHistory;
};

export const timestampToTimeString = (timestamp) => {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleTimeString("en-GB");
};

export const getDuration = (startTimestamp, endTimestamp) => {
  const difference = endTimestamp - startTimestamp;
  const hours = new Date(difference).getHours();
  const mins = new Date(difference).getMinutes();
  const secs = new Date(difference).getSeconds();
  return `${padDuration(hours)}:${padDuration(mins)}:${padDuration(secs)}`;
};

const padDuration = (unitsOfTime) => {
  return unitsOfTime < 10 ? "0" + unitsOfTime : unitsOfTime;
};
