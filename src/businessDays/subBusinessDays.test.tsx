import subBusinessDays from "./subBusinessDays";

describe("subBusinessDays", () => {
  it("can handle a large number of business days", function () {
    jest.setTimeout(500);

    const result = subBusinessDays(new Date(15000, 0 /* Jan */, 1), 3387885);
    expect(result).toEqual(new Date(2014, 0 /* Jan */, 1));
  });

  describe("exceptions", () => {
    it("can take in a list of enabling exceptions", () => {
      const result = subBusinessDays(new Date(2022, 0 /* Jan */, 17), 10, {
        exceptions: {
          "01/16/22": true,
          "01/09/22": true,
        },
      });
      expect(result).toEqual(new Date(2022, 0 /* Jan */, 5));
    });

    it("can take in a list of disabling exceptions", () => {
      const result = subBusinessDays(new Date(2022, 0 /* Jan */, 24), 10, {
        exceptions: {
          "01/17/22": false,
          "01/10/22": false,
        },
      });

      expect(result).toEqual(new Date(2022, 0 /* Jan */, 6));
    });

    it("can account for businessDays and exception options", () => {
      const result = subBusinessDays(new Date(2022, 0 /* Jan */, 24), 11, {
        // given businessDays of Mon-Sat
        businessDays: [1, 2, 3, 4, 5, 6],
        exceptions: {
          "01/17/22": false,
          "01/10/22": false,
        },
      });

      expect(result).toEqual(new Date(2022, 0 /* Jan */, 8));
    });
  });

  it("throws RangeError if businessDays contains numbers greater than 6", function () {
    const block = subBusinessDays.bind(null, new Date(2022, 0, 14), 10, {
      businessDays: [3, 4, 5, 6, 7],
    });

    expect(block).toThrow(RangeError);
  });
});
