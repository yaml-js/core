import { Worker } from 'worker_threads'
import path from 'path'

const INT32_BYTES = 4

export type AsycFunction<T extends unknown[], R> = (...args: T) => Promise<R>

export interface RunSyncOptions {
  bufferSize?: number
  timeout?: number
}

export class Synronizer<T extends unknown[], R> {

  constructor(private readonly fn: AsycFunction<T, R>, private readonly options: RunSyncOptions) {
  }

  run(...args: unknown[]): R {
    const { bufferSize = 64 * 1024, timeout } = this.options
    const sharedBuffer = new SharedArrayBuffer(bufferSize)
    const semaphore = new Int32Array(sharedBuffer)
    const workerScript = path.join(path.dirname(__filename), 'worker.mjs')
    const worker = new Worker(workerScript, { workerData: { fn: this.fn.toString(), args, sharedBuffer } })
    worker.on("error", (err) => { throw err });

    if (Atomics.wait(semaphore, 0, 0, timeout) == "timed-out") {
      worker.terminate()
      throw new Error('Timeout wating for worker to finish')
    }

    worker.terminate();

    let length = semaphore[0]
    let error = false
    if (length < 0) {
      error = true
      length *= -1
    }
    const data = JSON.parse(Buffer.from(sharedBuffer, INT32_BYTES, length).toString())
    if (error) {
      throw data
    } else {
      return data
    }
  }
}
