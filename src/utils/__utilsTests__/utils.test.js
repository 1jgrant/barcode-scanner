import { padDuration, msToTimeString } from "../dataUtils";

describe("padDuration", () => {
  test("should return string of input when input is greater than 10", () => {
    expect(padDuration(10)).toBe("10");
  });
  test("should return padded string of input when input is less than 10", () => {
    expect(padDuration(9)).toBe("09");
  });
  test("should return padded string of 00 when input is 0", () => {
    expect(padDuration(0)).toBe("00");
  });
});

describe("getDuration", () => {
  test("should return a formatted string from a millisecond integer", () => {
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
