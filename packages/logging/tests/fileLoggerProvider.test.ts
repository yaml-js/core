import * as fs from 'fs';
import * as path from 'path';
import { FileLoggerProvider } from '../src/fileLoggerProvider';
import { addLoggerProvider, getLogger } from '../src/loggingSystem';

import { setTimeout as setTimeoutAsync } from 'timers/promises';

const sleep = async (ms: number) => { await setTimeoutAsync(ms, 'resolved') }

describe('Subject: FileLoggerProvider', () => {

  it('Scenario 01: Message is output to a file using default configurations', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

    addLoggerProvider(new FileLoggerProvider('./tests/.logs'));
    const logger = getLogger("some name");
    console.log = jest.fn();

    logger.info(() => 'message');
    expect(console.log).toHaveBeenCalledTimes(1);

    await sleep(100);

    const logFilePath = path.resolve(process.cwd(), `./tests/.logs/some name.${date.getTime()}.log`);
    expect(fs.existsSync(logFilePath)).toBe(true);
    const content = fs.readFileSync(logFilePath, 'utf8');
    expect(content).toBe(`[${date.toISOString()}][some name] INFO message {"timestamp":"${date.toISOString()}","logger":"some name","level":"INFO","message":"message","arguments":[]}\n`);
  });

  it('Scenario 02: Message is output to a file when using non alphanumeric characters on logger name and using default configurations', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

    addLoggerProvider(new FileLoggerProvider('./tests/.logs'));
    const logger = getLogger("some.name.with.special.characters");
    const loggerWithTag = logger.withTag("tag.name");
    console.log = jest.fn();

    loggerWithTag.info(() => 'message');
    expect(console.log).toHaveBeenCalledTimes(1);

    await sleep(100);

    const logFilePath = path.resolve(process.cwd(), `./tests/.logs/some_name_with_special_characters.${date.getTime()}.log`);
    expect(fs.existsSync(logFilePath)).toBe(true);
    const content = fs.readFileSync(logFilePath, 'utf8');
    expect(content).toBe(`[${date.toISOString()}][some.name.with.special.characters:tag.name] INFO message {"timestamp":"${date.toISOString()}","logger":"some.name.with.special.characters:tag.name","level":"INFO","message":"message","arguments":[]}\n`);
  });
});
