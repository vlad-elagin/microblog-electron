import { app, BrowserWindow } from 'electron';
import axios from 'axios';
import * as path from 'path';
import * as url from 'url';
import { ipcMain as ipc } from 'electron-better-ipc';
import dotenv from 'dotenv-safe';
import log from 'electron-log';

import { AuthService, UserService } from './services';
import * as IPC from '../const/ipc';

dotenv.config();

let win: BrowserWindow | null;
let authService: AuthService;
let userService: UserService;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true
    },
    title: 'Microblog Electron App'
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', async () => {
  await createWindow();

  if (!win) {
    throw new Error('Cannot access main window while initializing services.');
  }

  initializeHttpRequestsConfigs();
  initializeIpcCommunication();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

const initializeIpcCommunication = () => {
  // === Initializing services ===
  // This function isn't intended to be run before main window is initialized.
  // @ts-ignore
  authService = new AuthService(win);
  userService = new UserService();

  // ====== Status exchange ======
  ipc.answerRenderer(IPC.AUTH.STATUS, authService.checkStatus);
  ipc.answerRenderer(IPC.AUTH.LOGOUT, authService.logout);

  // =========== Http ============
  ipc.answerRenderer(IPC.USER.CREATE, userService.createUser);
  ipc.answerRenderer(IPC.AUTH.LOGIN, authService.login);
};

const initializeHttpRequestsConfigs = () => {
  axios.defaults.baseURL = process.env.API_URL;

  // this app requires proper backend to be set
  // we need to notify user that test are probably failing because server isn't running
  // TODO rework this when adding network detection feature
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNREFUSED') {
        log.info(
          'Error occured while performing http request: server seems to not respond. Ensure that it is up and running.'
        );
      }
      return Promise.reject(error);
    }
  );
};
