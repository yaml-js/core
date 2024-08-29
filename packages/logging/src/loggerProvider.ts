import { Logger } from './logger'
import { LogLevel } from './logLevel'

export interface LoggerProvider {
  getLogger(name: string, logLevel: LogLevel): Logger
}
