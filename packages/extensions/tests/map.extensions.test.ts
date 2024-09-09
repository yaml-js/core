import '../src/yaml-js.extensions';

describe('Subject: Map extensions', () => {

  it('Scenario 01: Using map method I am able to convert the entries in a map to an array', async () => {
    const map = new Map<string, number>([["One", 1], ["Two", 2], ["Three", 3]]);
    const mapped = map.map((value, key) => `${key} = ${value}`);
    expect(mapped).toEqual(["One = 1", "Two = 2", "Three = 3"]);
  });

  it ('Scenario 02: Using getOrSet method I am able to get the value for a key or set it if it does not exist', async () => {
    const map = new Map<string, number>();
    const value = map.getOrSet("One", () => 1);
    expect(value).toBe(1);
    expect(map.get("One")).toBe(1);
  });

  it ('Scenario 03: Using getOrSet method If a value exists my factory method is not called', async () => {
    const map = new Map<string, number>();
    map.set("One", 1);
    const func = jest.fn();
    const value = map.getOrSet("One", func);

    expect(value).toBe(1);
    expect(func).not.toHaveBeenCalled();
  });
});
