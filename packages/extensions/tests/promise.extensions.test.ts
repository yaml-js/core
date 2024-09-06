import '../src/yaml-js.extensions';
import { Utils } from '../src/yaml-js.extensions';

describe('Subject: Promise extensions', () => {

  it('Scenario 01: I am able to cancel a given promise uing the cancelable wrapper', async () => {
    const nonExitPromise = new Promise<void>(() => {});
    const [cancelable, cancel] = nonExitPromise.cancelable();

    setTimeout(() => cancel(), 1000);
    try {
      await cancelable
    } catch (error) {
      expect(Utils.Error.fromUnknown(error).message).toEqual('Promise canceled');
    }

    expect(true).toBeTruthy();
  });

  it('Scenario 02: Cancelable promise is resolved when the wrapped promisse is resolved', async () => {
    const promise  = new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    const [cancelable, cancel] = promise.cancelable();

    setTimeout(() => cancel(), 1000);
    await cancelable

    expect(true).toBeTruthy();
  });
});
