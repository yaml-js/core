import { LogLevel } from './logLevel'

export type LogWriter = (message: string, args: unknown[]) => void
export type LogMessageProvider = () => string
export type LogMessageFormater = (level: LogLevel, name: LoggerName, message: string, args: unknown[]) => string

export interface LoggerName {
  name: string
  tag?: string
}

export interface Logger {
  withTag(tag: string): Logger
  log(level: LogLevel, message: LogMessageProvider, ...args: unknown[]): void
  trace(message: LogMessageProvider, ...args: unknown[]): void
  debug(message: LogMessageProvider, ...args: unknown[]): void
  info(message: LogMessageProvider, ...args: unknown[]): void
  warn(message: LogMessageProvider, ...args: unknown[]): void
  error(message: LogMessageProvider, ...args: unknown[]): void
}

export const createLogger = (writer: LogWriter, formater: LogMessageFormater, name: LoggerName, logLevel: LogLevel): Logger => {
  const log = (level: LogLevel, message: LogMessageProvider, args: unknown[]) => {
    if (level >= logLevel) {
      const messageText = message()
      const formatedMessage = formater(level, name, messageText, args)
      writer(formatedMessage, args)
    }
  }

  return {
    log: (level: LogLevel, message: LogMessageProvider, ...args: unknown[]) => log(level, message, args),
    withTag: (tag: string) => createLogger(writer, formater, { name: name.name, tag }, logLevel),
    trace: (message: LogMessageProvider, ...args: unknown[]) => log(LogLevel.TRACE, message, args),
    debug: (message: LogMessageProvider, ...args: unknown[]) => log(LogLevel.DEBUG, message, args),
    info: (message: LogMessageProvider, ...args: unknown[]) => log(LogLevel.INFO, message, args),
    warn: (message: LogMessageProvider, ...args: unknown[]) => log(LogLevel.WARN, message, args),
    error: (message: LogMessageProvider, ...args: unknown[]) => log(LogLevel.ERROR, message, args)
  } as Logger
}
