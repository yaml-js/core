import * as fs from 'fs';
import * as path from 'path';
import { FileLoggerProvider } from '../src/fileLoggerProvider';
import { addLoggerProvider, getLogger, removeAllLogggerProviders } from '../src/loggingSystem';

import { setTimeout as setTimeoutAsync } from 'timers/promises';

const sleep = async (ms: number) => { await setTimeoutAsync(ms, 'resolved') }

describe('Subject: FileLoggerProvider', () => {

  beforeAll(() => {
    addLoggerProvider(new FileLoggerProvider('./tests/.logs'));
  });

  it('Scenario 01: Message is output to a file using default configurations', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

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

    const logger = getLogger("some.name.with.special.characters");
    const loggerWithTag = logger.withTag("tag.name");
    console.log = jest.fn();

    loggerWithTag.info(() => 'message');
    expect(console.log).toHaveBeenCalledTimes(1);

    const logFilePath = path.resolve(process.cwd(), `./tests/.logs/some_name_with_special_characters.${date.getTime()}.log`);
    expect(fs.existsSync(logFilePath)).toBe(true);
    const content = fs.readFileSync(logFilePath, 'utf8');
    expect(content).toBe(`[${date.toISOString()}][some.name.with.special.characters:tag.name] INFO message {"timestamp":"${date.toISOString()}","logger":"some.name.with.special.characters:tag.name","level":"INFO","message":"message","arguments":[]}\n`);
  });

  it('Scenario 03: Message is output to a file using buffered file logger', async () => {

    const date = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(date);

    removeAllLogggerProviders();
    addLoggerProvider(new FileLoggerProvider('./tests/.logs', true, 2));
    const logger = getLogger("bufferd");

    logger.info(() => 'message');

    const logFilePath = path.resolve(process.cwd(), `./tests/.logs/bufferd.${date.getTime()}.log`);
    expect(fs.existsSync(logFilePath)).toBe(false);

    logger.info(() => 'message2');

    const content = fs.readFileSync(logFilePath, 'utf8');
    expect(content).toBe(`[${date.toISOString()}][bufferd] INFO message {"timestamp":"${date.toISOString()}","logger":"bufferd","level":"INFO","message":"message","arguments":[]}\n[${date.toISOString()}][bufferd] INFO message2 {"timestamp":"${date.toISOString()}","logger":"bufferd","level":"INFO","message":"message2","arguments":[]}\n`);
  });
});
