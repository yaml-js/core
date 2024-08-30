import { LogLevel, logLevelFromString, logLevelToString } from '../src/logLevel';

describe('Subject: Loglevel', () => {

  it('Scenario 01: It convert from string to LogLevel', async () => {
    expect(logLevelFromString('TRACE')).toBe(LogLevel.TRACE);
    expect(logLevelFromString('tRACe')).toBe(LogLevel.TRACE);
    expect(logLevelFromString('DEBUG')).toBe(LogLevel.DEBUG);
    expect(logLevelFromString('dEBUg')).toBe(LogLevel.DEBUG);
    expect(logLevelFromString('INFO')).toBe(LogLevel.INFO);
    expect(logLevelFromString('iNFo')).toBe(LogLevel.INFO);
    expect(logLevelFromString('WARN')).toBe(LogLevel.WARN);
    expect(logLevelFromString('wARn')).toBe(LogLevel.WARN);
    expect(logLevelFromString('ERROR')).toBe(LogLevel.ERROR);
    expect(logLevelFromString('eRROr')).toBe(LogLevel.ERROR);
  });

  it('Scenario 02: When converting an invalid LogLevel from string it returns INFO', async () => {
    expect(logLevelFromString('xprto')).toBe(LogLevel.INFO);
  });

  it('Scenario 03: It convert from LogLevel to string', async () => {
    expect(logLevelToString(LogLevel.TRACE)).toBe("TRACE");
    expect(logLevelToString(LogLevel.DEBUG)).toBe("DEBUG");
    expect(logLevelToString(LogLevel.INFO)).toBe("INFO");
    expect(logLevelToString(LogLevel.WARN)).toBe("WARN");
    expect(logLevelToString(LogLevel.ERROR)).toBe("ERROR");
  });

});
