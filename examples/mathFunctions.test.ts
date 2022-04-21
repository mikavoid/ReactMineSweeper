import { add, mul } from "./mathFunctions";

describe("MathFunctions tests", () => {
  it("add two numbers", () => {
    expect(add(2, 1)).toBe(3);
  });

  it("check multiply function ", () => {
    expect(mul(2, 3)).toBe(6);
  });
});
