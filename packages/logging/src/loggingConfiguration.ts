import { LogLevel } from './logLevel'

export interface LoggingConfiguration {
  root: string | LogLevel
  [key: string]: string | LogLevel
}
