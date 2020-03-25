import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';

jest.setTimeout(10000);

describe('Main window', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({
      // electron default exports apps path
      // @ts-ignore
      path: electronPath,
      args: [path.join(__dirname, '..', '..')]
    });

    return app.start();
  });

  afterEach(() => {
    if (app.isRunning()) {
      return app.stop();
    }
  });

  it('Opens the window', async () => {
    const { client, browserWindow } = app;

    await client.waitUntilWindowLoaded();
    const title = await browserWindow.getTitle();

    expect(title).toBe('Microblog Electron App');
  });
});
