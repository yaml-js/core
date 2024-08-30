import "jest-extended";
import * as matchers from 'jest-extended';
expect.extend(matchers);

import { LogLevel } from '../src/logLevel';
import { simpleLogMessageFormatter, structuredLogMessageFormatter } from '../src/logMessageFormatters';

describe('Subject: OOB LogMessageFormaters', () => {

  it('Scenario 01: Simple log formatter formats the output message as expected value', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

    const message = simpleLogMessageFormatter(LogLevel.INFO, { name: 'test', tag: 'tag' }, 'message', ['arg1', 'arg2']);
    expect(message).toEqual(`[${date.toISOString()}][test:tag] INFO message`);
  });

  it('Scenario 02: Structured log formatter formats the output message as expected value', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

    const logObject = {
      timestamp: date.toISOString(),
      logger: "test:tag",
      level: "INFO",
      message: "message",
      arguments: [{name: 'arg1' }, 'arg2']
    }

    const message = structuredLogMessageFormatter(LogLevel.INFO, { name: 'test', tag: 'tag' }, 'message', [{name: 'arg1' }, 'arg2']);
    expect(message).toEndWith(`[${date.toISOString()}][test:tag] INFO message ${JSON.stringify(logObject)}`);
  });

  it('Scenario 02: Structured log formatter formats the output message as expected is no args are passed', async () => {
    const date = new Date();
    jest.setSystemTime(date);

    const logObject = {
      timestamp: date.toISOString(),
      logger: "test:tag",
      level: "INFO",
      message: "message",
      arguments: []
    }

    const message = structuredLogMessageFormatter(LogLevel.INFO, { name: 'test', tag: 'tag' }, 'message', []);
    expect(message).toEndWith(`[${date.toISOString()}][test:tag] INFO message ${JSON.stringify(logObject)}`);
  });
});
