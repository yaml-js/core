import * as path from 'path'
import * as fs from 'fs'
import { createLogger, Logger, LoggerName } from './logger'
import { LoggerProvider } from './loggerProvider'
import { LogLevel } from './logLevel'
import { structuredLogMessageFormatter } from './logMessageFormatters'

const createFileLogger = (filePath: string, name: LoggerName, logLevel: LogLevel): Logger => {
  const fileName = name.name.replaceAll(".", "_")
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath)
  }
  const logFilePath = path.join(filePath, `${fileName}.${Date.now()}.log`)
  let fileHandle: fs.promises.FileHandle

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const writer = async (message: string, _args: unknown[]) => {
    if (!fileHandle) {
      fileHandle = await fs.promises.open(logFilePath, 'w')
    }
    await fs.promises.appendFile(fileHandle, `${message}\n`, { encoding: 'utf8', flush: true })
  }

  return createLogger(writer, structuredLogMessageFormatter, name, logLevel)
}

export class FileLoggerProvider implements LoggerProvider {

  constructor(private readonly logFilePath: string) {
    if (!path.isAbsolute(logFilePath)) {
      logFilePath = path.join(process.cwd(), logFilePath)
    }
    fs.mkdirSync(logFilePath, { recursive: true })
  }

  getLogger(name: string, logLevel: LogLevel): Logger {
    return createFileLogger(this.logFilePath, { name }, logLevel)
  }
}
