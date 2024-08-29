import { LoggingConfiguration } from '../src/loggingConfiguration';
import { LogLevel } from '../src/logLevel';
import { getLogger, initializeLogging, removeAllLogggerProviders } from '../src/loggingSystem';
import { Logger } from '../src/logger';

const config : LoggingConfiguration = {
  root: 'INFO',
  'com.example': 'DEBUG',
  'com.example.sub': 'ERROR',
  'com.other.info': LogLevel.INFO,
  'com.trace': LogLevel.TRACE,
}

describe('Subject: Logging Subsystem', () => {

  it('Scenario 01: Message is output to the console using default configurations', async () => {
    const logger = getLogger("some name");
    console.log = jest.fn();

    logger.debug(() => 'Debug message');
    expect(console.log).not.toHaveBeenCalled();

    logger.info(() => 'Info message');
    expect(console.log).toHaveBeenCalledTimes(1);
  });


  it('Scenario 02: Messages is output to the console as per the defined configuration', async () => {
    initializeLogging(config);

    const loggers: Map<LogLevel, Logger[]> = new Map<LogLevel, Logger[]>([
      [LogLevel.TRACE, [ getLogger("com.trace"), getLogger("com.trace.1") ]],
      [LogLevel.DEBUG, [ getLogger("com.example"), getLogger("com.example.thisIsAlsoDebug"), getLogger("com.example.sub1") ]],
      [LogLevel.INFO, [ getLogger("no-root"), getLogger("com.other.info.2"), getLogger("com.example2") ]],
      [LogLevel.ERROR, [ getLogger("com.example.sub.1"), getLogger("com.example.sub") ]]
    ]);

    const allLevels = Object.values(LogLevel);
    for (const levelLoggers of loggers.entries()) {
      for (const logger of levelLoggers[1]) {
        for (const level of allLevels) {
          console.log = jest.fn();
          logger.log(level as LogLevel, () => 'Log message');
          if (level as LogLevel >= levelLoggers[0]) {
            expect(console.log).toHaveBeenCalledTimes(1);
          } else {
            expect(console.log).not.toHaveBeenCalled();
          }
        }
      }
    }
  });

  it('Scenario 03: If i call removeAllLogggerProviders, existing loggers will still output to console', async () => {
    console.log = jest.fn();
    const logger = getLogger("some name");
    logger.error(() => 'Error message');
    expect(console.log).toHaveBeenCalledTimes(1);

    removeAllLogggerProviders();
    console.log = jest.fn();
    logger.error(() => 'Error message');
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('Scenario 04: If i call removeAllLogggerProviders, on new loggers no message is sent to the console', async () => {
    console.log = jest.fn();
    const logger = getLogger("some name");
    logger.error(() => 'Error message');
    expect(console.log).toHaveBeenCalledTimes(1);

    removeAllLogggerProviders();
    console.log = jest.fn();
    const logger2 = getLogger("some name2");
    logger2.error(() => 'Error message');
    expect(console.log).not.toHaveBeenCalled();
  });

});
