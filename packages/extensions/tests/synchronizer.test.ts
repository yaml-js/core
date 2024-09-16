import { Utils } from '../src/yaml-js.extensions';

describe('Subject: Synchronizer extensions', () => {
  it ('Scenario 01: runSync should run a function synchronously', () => {
    const input = () => {
      return new Promise((resolve) => {
        setTimeout(() => { resolve(42); }, 300);
      });
    };

    const expected = 42;
    const actual = Utils.Synchronizer.runSync(input);
    expect(actual).toEqual(expected);
  });

  it ('Scenario 02: runSync passes arguments to the function', () => {
    const input = (arg: number) => {
      return new Promise((resolve) => {
        setTimeout(() => { resolve(arg); }, 300);
      });
    };

    const expected = 45;
    const actual = Utils.Synchronizer.runSync(input, expected);
    expect(actual).toEqual(expected);
  });

  it ('Scenario 03: runSync aborts if timeout is reached', () => {
    const input = (arg: number) => {
      return new Promise((resolve) => {
        setTimeout(() => { resolve(arg); }, 3000);
      });
    };

    const expected = 45;
    const fn = () => Utils.Synchronizer.runSyncWithOptions(input, {timeout: 100}, expected);
    expect(fn).toThrow('Timeout wating for worker to finish');
  });
});
