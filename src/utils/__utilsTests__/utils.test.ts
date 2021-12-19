import { padDuration, msToTimeString, formatScanData } from "../dataUtils";

describe("padDuration", () => {
  it("should return string of input when input is greater than 10", () => {
    expect(padDuration(10)).toBe("10");
  });
  it("should return padded string of input when input is less than 10", () => {
    expect(padDuration(9)).toBe("09");
  });
  it("should return padded string of 00 when input is 0", () => {
    expect(padDuration(0)).toBe("00");
  });
});

describe("msToTimeString", () => {
  it("should return a formatted string from a millisecond integer", () => {
    const time1 = 1637689863603;
    const time2 = time1 + 15000;
    const duration1 = time2 - time1;
    const expectedOutput1 = `00:00:15`;
    expect(msToTimeString(duration1)).toBe(expectedOutput1);
    const time3 = time1 + 2115000;
    const expectedOutput2 = `00:35:15`;
    const duration2 = time3 - time1;
    expect(msToTimeString(duration2)).toBe(expectedOutput2);
    const time4 = time1 + 4065000;
    const expectedOutput3 = `01:07:45`;
    const duration3 = time4 - time1;
    expect(msToTimeString(duration3)).toBe(expectedOutput3);
  });
});

describe("formatScanData", () => {
  it("should return an array with a new scan entry if history is empty", () => {
    const testNewScanEntry = { code: "B3189321", timestamp: 1637531751507 };
    const expectedOutput = [
      {
        code: "B3189321",
        startTimestamp: 1637531751507,
        startTime: "21:55:51",
        endTimestamp: null,
        endTime: null,
        duration: null,
      },
    ];
    expect(formatScanData(testNewScanEntry, [])).toEqual(expectedOutput);
  });
  it("should add an the stop time to an existing record", () => {
    const testNewScanEntry = { code: "B3189321", timestamp: 1637531898959 };
    const testScanHistory = [
      {
        code: "B3189321",
        startTimestamp: 1637531751507,
        startTime: "21:55:51",
        endTimestamp: null,
        endTime: null,
        duration: null,
      },
    ];
    const expectedOutput = [
      {
        code: "B3189321",
        startTimestamp: 1637531751507,
        startTime: "21:55:51",
        endTimestamp: 1637531898959,
        endTime: "21:58:18",
        duration: "00:02:27",
      },
    ];
    expect(formatScanData(testNewScanEntry, testScanHistory)).toEqual(
      expectedOutput
    );
  });
  it("should return an array with a new scan entry if record does not already exist in history", () => {
    const testNewScanEntry = { code: "A4940154", timestamp: 1637531519431 };
    const testScanHistory = [
      {
        code: "B3189321",
        startTimestamp: 1637531751507,
        startTime: "21:55:51",
        endTimestamp: null,
        endTime: null,
        duration: null,
      },
    ];
    const expectedOutput = [
      {
        code: "B3189321",
        startTimestamp: 1637531751507,
        startTime: "21:55:51",
        endTimestamp: null,
        endTime: null,
        duration: null,
      },
      {
        code: "A4940154",
        startTimestamp: 1637531519431,
        startTime: "21:51:59",
        endTimestamp: null,
        endTime: null,
        duration: null,
      },
    ];
    expect(formatScanData(testNewScanEntry, testScanHistory)).toEqual(
      expectedOutput
    );
  });
});
