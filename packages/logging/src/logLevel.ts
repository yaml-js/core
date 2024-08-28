export enum LogLevel {
  DEBUG = 0,
  INFO = 10,
  WARN = 20,
  ERROR = 30
}

const levelToStrings = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR'
}

const stringToLevels: Record<string, LogLevel> = {
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
