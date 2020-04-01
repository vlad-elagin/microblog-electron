import { Application } from 'spectron';
import path from 'path';
import electronPath from 'electron';

export const initializeSpectronApp = () => {
  // eslint-disable-next-line no-param-reassign
  const app = new Application({
    // @ts-ignore
    path: electronPath,
    args: [path.join(__dirname, '..', '..')]
  });

  return app.start();
};

export const stopSpectronApplication = (app: Application) => {
  return app.stop();
};
