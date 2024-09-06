import * as path from 'path'
import * as fs from 'fs'
import { createLogger, Logger, LoggerName } from './logger'
import { LoggerProvider } from './loggerProvider'
import { LogLevel } from './logLevel'
import { structuredLogMessageFormatter } from './logMessageFormatters'

class LoggerBuffer {
  private buffer: string[] = []

  constructor(
    private filePath: string,
    private readonly buffered: boolean,
    private readonly bufferSize: number
  ) {
    if (buffered) {
      if (bufferSize <= 0) {
        throw new Error('Buffer size must be greater than 0')
      }
      process.on('exit', () => {
        this.flush()
      })
    }
  }

  public write(message: string) {
    if (this.buffered) {
      this.buffer.push(message)
      if (this.buffer.length >= this.bufferSize) {
        this.flush()
      }
    } else {
      fs.appendFileSync(this.filePath, `${message}\n`, { encoding: 'utf8' })
    }
  }

  private flush() {
    if (this.buffer.length > 0) {
      const data = this.buffer.join('\n')
      fs.appendFileSync(this.filePath, `${data}\n`, { encoding: 'utf8' })
      this.buffer = []
    }
  }
}

const createFileLogger = (filePath: string, buffered: boolean, bufferSize: number, name: LoggerName, logLevel: LogLevel): Logger => {
  const fileName = name.name.replaceAll('.', '_')
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath)
  }
  const logFilePath = path.join(filePath, `${fileName}.${Date.now()}.log`)
  const buffer = new LoggerBuffer(logFilePath, buffered, bufferSize)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const writer = async (message: string, _args: unknown[]) => {
    buffer.write(message)
  }

  return createLogger(writer, structuredLogMessageFormatter, name, logLevel)
}

export class FileLoggerProvider implements LoggerProvider {
  constructor(
    private readonly logFilePath: string,
    private readonly buffered = false,
    private readonly bufferSize = 0
  ) {
    if (!path.isAbsolute(logFilePath)) {
      logFilePath = path.join(process.cwd(), logFilePath)
    }
    fs.mkdirSync(logFilePath, { recursive: true })
  }

  getLogger(name: string, logLevel: LogLevel): Logger {
    return createFileLogger(this.logFilePath, this.buffered, this.bufferSize, { name }, logLevel)
  }
}
