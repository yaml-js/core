import { workerData, parentPort } from 'worker_threads'

const  INT32_BYTES = 4;

parentPort.on("message", msg => {
  runAsWorker(() => eval(msg))
})

async function run() {
  const { fn, args, sharedBuffer } = workerData

  let result, error = false
  try {
    const evaluatedFn = eval(fn)
    result = await evaluatedFn(...args)
  } catch (e) {
    console.log("Error executing function", e)
    result = e
    error = true
  }

  const data = JSON.stringify(result)
  const buf = Buffer.from(data)
  buf.copy(Buffer.from(sharedBuffer), INT32_BYTES)
  const semaphore = new Int32Array(sharedBuffer)
  Atomics.store(semaphore, 0, error ? -buf.length : buf.length)
  Atomics.notify(semaphore, 0)
}

run()
