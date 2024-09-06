import '../src/yaml-js.extensions';

describe('Subject: Map extensions', () => {

  it('Scenario 01: Using map method I am able to convert the entries in a map to an array', async () => {
    const map = new Map<string, number>([["One", 1], ["Two", 2], ["Three", 3]]);
    const mapped = map.map((value, key) => `${key} = ${value}`);
    expect(mapped).toEqual(["One = 1", "Two = 2", "Three = 3"]);
  });
});
