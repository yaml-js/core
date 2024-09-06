import { EventEmitter } from "events";

declare global {
  interface Promise<T> {
    cancelable(): [Promise<T>, () => void];
  }
}

class CancelEmmitter extends EventEmitter {
  cancel() {
    this.emit('cancel');
  }
}

Promise.prototype.cancelable = function <T>(this: Promise<T>): [Promise<T>, () => void] {
  const cancelEmitter = new CancelEmmitter();
  const promise = new Promise<T>(async (resolve, reject) => {
    cancelEmitter.on('cancel', () => {
      reject(new Error('Promise canceled'));
    });

    try {
      const result = await this;
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });

  return [promise, () => cancelEmitter.cancel()];
}


export { }
