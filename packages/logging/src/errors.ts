export class LoggingAlredyInitializeError extends Error {
  constructor() {
    super('Logging subsystem already initialized, cannot initialize again')
  }
}
