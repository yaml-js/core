import { LoggerName, LogMessageFormater } from './logger'
import { LogLevel, logLevelToString } from './logLevel'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const simpleLogMessageFormatter: LogMessageFormater = (level: LogLevel, name: LoggerName, message: string, _args: unknown[]) => {
  // Construct the tag part
  const nameAndTag = `${name.name}${name.tag ? `:${name.tag}` : ''}`
  const timestamp = new Date().toISOString()
  const levelString = logLevelToString(level)
  return `[${timestamp}][${nameAndTag}] ${levelString} ${message}`
}

export const structuredLogMessageFormatter: LogMessageFormater = (level: LogLevel, name: LoggerName, message: string, args: unknown[]) => {
  // Construct the tag part
  const nameAndTag = `${name.name}${name.tag ? `:${name.tag}` : ''}`
  const timestamp = new Date().toISOString()
  const levelString = logLevelToString(level)

  const logObject = {
    timestamp: timestamp,
    logger: nameAndTag,
    level: levelString,
    message: message,
    arguments: args
  }
  return `${simpleLogMessageFormatter(level, name, message, args)} ${JSON.stringify(logObject)}`
}
