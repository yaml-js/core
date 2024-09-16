import {AsycFunction, RunSyncOptions, Synronizer} from "./synchronizer"

export class ErrorWithData extends Error {
  constructor(
    message: string,
    public data: unknown
  ) {
    super(message)
  }
}

export const Utils = {
  Synchronizer: {
    runSyncWithOptions: <T extends unknown[], R>(fn: AsycFunction<T, R>, options: RunSyncOptions, ...args: unknown[]): R => {
      const synchronizer = new Synronizer<T, R>(fn, options)
      return synchronizer.run(...args)
    },
    runSync: <T extends unknown[], R>(fn: AsycFunction<T, R>, ...args: unknown[]): R => {
      const synchronizer = new Synronizer<T, R>(fn, { bufferSize: 64 * 1024, timeout: undefined })
      return synchronizer.run(...args)
    }
  },

  Error: {
    fromUnknown: (source: unknown): Error => {
      if (source === undefined || source === null) {
        return new Error('Unknown error')
      } else if (source instanceof Error) {
        return source as Error
      } else if (typeof source === 'string') {
        return new Error(source)
      } else {
        return new ErrorWithData(source.toString(), source)
      }
    }
  }
}
