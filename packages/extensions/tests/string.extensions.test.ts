import '../src/string.extensions';

describe('Subject: String extensions', () => {

  it('Scenario 01: toCamelCase should convert a string with spaces to camel case', () => {
    const input = 'hello world';
    const expected = 'helloWorld';
    expect(input.toCamelCase()).toEqual(expected);
  });

  it('Scenario 02: toCamelCase should convert a string with hyphens to camel case', () => {
    const input = 'hello-world';
    const expected = 'helloWorld';
    expect(input.toCamelCase()).toEqual(expected);
  });

  it('Scenario 03: toCamelCase should convert a string with consecutive uppercase letters to camel case', () => {
    const input = 'hello WORLD';
    const expected = 'helloWorld';
    expect(input.toCamelCase()).toEqual(expected);
  });

  it('Scenario 04: toCamelCase should convert an empty string to an empty string', () => {
    const input = '';
    const expected = '';
    expect(input.toCamelCase()).toEqual(expected);
  });

  it('Scenario 05: toSnakeCase should convert a string with spaces to snake case', () => {
    const input = 'hello world';
    const expected = 'hello_world';
    expect(input.toSnakeCase()).toEqual(expected);
  });

  it('Scenario 06: toSnakeCase should convert a string with camel case to snake case', () => {
    const input = 'helloWorld';
    const expected = 'hello_world';
    expect(input.toSnakeCase()).toEqual(expected);
  });

  it('Scenario 07: toSnakeCase should convert a string with consecutive uppercase letters to snake case', () => {
    const input = 'helloWORLD';
    const expected = 'hello_world';
    expect(input.toSnakeCase()).toEqual(expected);
  });

  it('Scenario 08: toSnakeCase should convert an empty string to an empty string', () => {
    const input = '';
    const expected = '';
    expect(input.toSnakeCase()).toEqual(expected);
  });

  it('Scenario 09: splitLines should split a string with line breaks into an array of lines', () => {
    const input = 'line 1\nline 2\nline 3';
    const expected = ['line 1', 'line 2', 'line 3'];
    expect(input.splitLines()).toEqual(expected);
  });

  it('Scenario 10: splitLines should split a string with line breaks using both \n and \r\n into an array of lines', () => {
    const input = 'line 1\nline 2\r\nline 3';
    const expected = ['line 1', 'line 2', 'line 3'];
    expect(input.splitLines()).toEqual(expected);
  });

  it('Scenario 11: splitLines should split a string with only one line into an array with that line', () => {
    const input = 'single line';
    const expected = ['single line'];
    expect(input.splitLines()).toEqual(expected);
  });

  it('Scenario 12: splitLines should split an empty string into an empty array', () => {
    const input = '';
    const expected: string[] = [];
    expect(input.splitLines()).toEqual(expected);
  });
});
