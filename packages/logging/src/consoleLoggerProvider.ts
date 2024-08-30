import { createLogger, Logger, LoggerName, LogMessageFormater } from './logger'
import { LoggerProvider } from './loggerProvider'
import { LogLevel, logLevelToString } from './logLevel'

const consoleStyles: { [key: string]: string } = {
  RESET: '\x1b[0m', // Reset to default
  YELLOW: '\x1b[33m', // Yellow color
  RED: '\x1b[31m', // Red color
  BOLD: '\x1b[1m' // Bold text
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorFullMessageFormater: LogMessageFormater = (level: LogLevel, name: LoggerName, message: string, _args: unknown[]) => {
  let format = consoleStyles.BOLD
  if (level === LogLevel.WARN) {
    format += consoleStyles.YELLOW
  } else if (level === LogLevel.ERROR) {
    format += consoleStyles.RED
  }
  // Construct the tag part
  const tagPart = name.tag ? `:${name.tag}` : ''
  const nameAndTagPart = `${format}[${name.name}${tagPart}]${consoleStyles.RESET}`
  const timestamp = new Date().toISOString()
  const levelString = logLevelToString(level)
  return `[${timestamp}][${nameAndTagPart}] ${levelString} ${message}`
}

const createConsoleLogger = (name: LoggerName, logLevel: LogLevel): Logger => {
  const writer = (message: string, args: unknown[]) => {
    if (args && args.length > 0) {
      console.log(message, args)
    } else {
      console.log(message)
    }
  }

  return createLogger(writer, colorFullMessageFormater, name, logLevel)
}

export class ConsoleLoggerProvider implements LoggerProvider {
  getLogger(name: string, logLevel: LogLevel): Logger {
    return createConsoleLogger({ name }, logLevel)
  }
}
