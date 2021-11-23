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

export const padDuration = (unitsOfTime) => {
  return unitsOfTime < 10 ? "0" + unitsOfTime : `${unitsOfTime}`;
};

export const msToTimeString = (duration) => {
  const secs = Math.floor((duration / 1000) % 60);
  const mins = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${padDuration(hours)}:${padDuration(mins)}:${padDuration(secs)}`;
};
