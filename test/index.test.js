const { capitalizeWords, filterActiveUsers, logAction } = require("../index");

describe("Capitalize words", () => {
  it("capitalizes a normal sentence", () => {
    const result = capitalizeWords("hello world");
    expect(result).toBe("Hello World");
  });

  it("returns an empty string when input is empty", () => {
    const result = capitalizeWords("");
    expect(result).toBe("");
  });

  it("capitalizes words that contain hyphens", () => {
    const result = capitalizeWords("hello-world");
    expect(result).toBe("Hello-World");
  });

  it("capitalizes a single word correctly", () => {
    const result = capitalizeWords("Hello");
    expect(result).toBe("Hello");
  });
});

describe("Filter active users", () => {
  const sampleUsers = [
    { name: "Patrick", isActive: false },
    { name: "Patrick", isActive: true },
  ];

  it("verifies that the input list includes both active and inactive entries", () => {
    const containsActive = sampleUsers.some((user) => user.isActive === true);
    const containsInactive = sampleUsers.some(
      (user) => user.isActive === false
    );

    expect(containsActive).toBe(true);
    expect(containsInactive).toBe(true);
  });

  it("returns only users marked as active", () => {
    const activeList = filterActiveUsers(sampleUsers);

    expect(activeList).toEqual([
      {
        name: "Patrick",
        isActive: true,
      },
    ]);
  });

  it("returns an empty array when the provided list has no users", () => {
    const emptyList = [];
    const result = filterActiveUsers(emptyList);

    expect(result).toHaveLength(0);
  });
});
describe("Log Action", () => {
  test("should return a correct log string for correct inputs", () => {
    const results = logAction("login", "Patrick");
    const expectedOutput =
      /^User Patrick performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(results).toMatch(expectedOutput);
  });

  test("should return a correct log string for missing action", () => {
    const result = logAction(undefined, "Patrick");
    const expectedOutput =
      /^User Patrick performed undefined at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    expect(result).toMatch(expectedOutput);
  });
  test("should return a correct log string for missing user name", () => {
    const result = logAction("login", undefined);
    const expectedOutput =
      /^User undefined performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    expect(result).toMatch(expectedOutput);
  });
  test("should generate a log string when an empty string is passed", () => {
    const result = logAction("", "");
    const expectedOutput =
      /^User\s\sperformed\s\sat\s\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    expect(result).toMatch(expectedOutput);
  });
});
