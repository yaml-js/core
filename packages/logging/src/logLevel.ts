export enum LogLevel {
  TRACE = 0,
  DEBUG = 10,
  INFO = 20,
  WARN = 30,
  ERROR = 40
}

const levelToStrings = {
  [LogLevel.TRACE]: 'TRACE',
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR'
}

const stringToLevels: Record<string, LogLevel> = {
  TRACE: LogLevel.TRACE,
  DEBUG: LogLevel.DEBUG,
  INFO: LogLevel.INFO,
  WARN: LogLevel.WARN,
  ERROR: LogLevel.ERROR
}

export const logLevelToString = (level: LogLevel): string => {
  return levelToStrings[level]
}

export const logLevelFromString = (level: string): LogLevel => {
  const upper = level.toUpperCase()
  if (upper in stringToLevels) {
    return stringToLevels[upper]
  } else {
    return LogLevel.INFO // default
  }
}
