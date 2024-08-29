import { LoggingAlredyInitializeError } from './errors'
import { LoggerProvider } from './loggerProvider'
import { LoggingConfiguration } from './loggingConfiguration'
import { LogLevel, logLevelFromString } from './logLevel'
import { Logger, LogMessageProvider } from './logger'
import { ConsoleLoggerProvider } from './consoleLoggerProvider'

const getLogLevel = (value: string | LogLevel): LogLevel => {
  return typeof value === 'string' ? logLevelFromString(value as string) : (value as LogLevel)
}

const sortConfig = (config: LoggingConfiguration): { name: string; level: LogLevel }[] => {
  return Object.keys(config)
    .filter((key) => key !== 'root')
    .map((key) => {
      return { name: key, level: getLogLevel(config[key]) }
    })
    .sort((a, b) => b.name.length - a.name.length)
}

interface LogLevelOverride {
  name: string
  level: LogLevel
}

class LoggerWrapper implements Logger {
  constructor(
    private loggers: Logger[],
    private level: LogLevel
  ) {}

  withTag(tag: string): Logger {
    return new LoggerWrapper(
      this.loggers.map((logger) => logger.withTag(tag)),
      this.level
    )
  }

  log(level: LogLevel, message: LogMessageProvider, ...args: unknown[]): void {
    if (level >= this.level) {
      this.loggers.forEach((logger) => logger.log(level, message, ...args))
    }
  }

  debug(message: LogMessageProvider, ...args: unknown[]): void {
    if (this.level <= LogLevel.DEBUG) {
      this.loggers.forEach((logger) => logger.debug(message, ...args))
    }
  }

  info(message: LogMessageProvider, ...args: unknown[]): void {
    if (this.level <= LogLevel.INFO) {
      this.loggers.forEach((logger) => logger.info(message, ...args))
    }
  }

  warn(message: LogMessageProvider, ...args: unknown[]): void {
    if (this.level <= LogLevel.WARN) {
      this.loggers.forEach((logger) => logger.warn(message, ...args))
    }
  }

  error(message: LogMessageProvider, ...args: unknown[]): void {
    if (this.level <= LogLevel.ERROR) {
      this.loggers.forEach((logger) => logger.error(message, ...args))
    }
  }
}

class LoggingSystem {
  private initialized = false
  private config: { root: LogLevel; overrides: LogLevelOverride[] } = { root: LogLevel.INFO, overrides: [] }

  private providers: LoggerProvider[] = []
  private loggers: Record<string, Logger> = {}

  public get isInitialized() {
    return this.initialized
  }

  public removeAllLogggerProviders() {
    this.providers = []
  }

  public registerProvider(provider: LoggerProvider) {
    this.providers.push(provider)
  }

  private getLogLevel(name: string): LogLevel {
    for (let i = 0; i < this.config.overrides.length; i++) {
      const override = this.config.overrides[i]
      if (name === override.name) {
        return override.level
      } else if (name.startsWith(`${override.name}.`)) {
        return override.level
      }
    }
    return this.config.root
  }

  public createLogger(name: string, level: LogLevel): Logger {
    const loggers = this.providers.map((provider) => provider.getLogger(name, level))
    return new LoggerWrapper(loggers, level)
  }

  public getLogger(name: string): Logger {
    if (!this.loggers[name]) {
      const level = this.getLogLevel(name)
      this.loggers[name] = this.createLogger(name, level)
    }

    return this.loggers[name]
  }

  public initialize(config: LoggingConfiguration) {
    if (this.initialized) {
      throw new LoggingAlredyInitializeError()
    }

    this.initialized = true

    this.config = {
      root: getLogLevel(config.root),
      overrides: sortConfig(config)
    }
  }
}

const loggingSystem = new LoggingSystem()
loggingSystem.registerProvider(new ConsoleLoggerProvider())

export const initializeLogging = (config: LoggingConfiguration, providers: LoggerProvider[] = []) => {
  console.log('Initializing logging subsystem', { config: config })
  loggingSystem.initialize(config)

  providers.forEach((provider) => {
    loggingSystem.registerProvider(provider)
  })
}
export const removeAllLogggerProviders = () => {
  loggingSystem.removeAllLogggerProviders()
}

export const addLoggerProvider = (provider: LoggerProvider) => {
  loggingSystem.registerProvider(provider)
}

export const getLogger = (name: string): Logger => {
  return loggingSystem.getLogger(name)
}
