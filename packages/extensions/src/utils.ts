export class ErrorWithData extends Error {
  constructor(message: string, public data: unknown) {
    super(message);
  }
}

export const Utils = {
  Error: {
    fromUnknown: (source: unknown): Error => {
      if (source === undefined || source === null) {
        return new Error('Unknown error');
      } else if (source instanceof Error) {
        return source as Error;
      } else if (typeof source === 'string') {
        return new Error(source);
      } else {
        return new ErrorWithData(source.toString(), source);
      }
    }
  }
}
