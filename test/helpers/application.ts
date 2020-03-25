import { Application } from 'spectron';
import path from 'path';
import electronPath from 'electron';

export const initializeSpectronApp = (app: Application) => {
  // eslint-disable-next-line no-param-reassign
  app = new Application({
    // @ts-ignore
    path: electronPath,
    args: [path.join(__dirname, '..', '..')]
  });

  return app.start();
};

export const stopSpectronApplication = (app: Application) => {
  if (app.isRunning()) {
    return app.stop();
  }
};
