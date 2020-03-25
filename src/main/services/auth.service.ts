import axios from 'axios';
import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import log from 'electron-log';

import { IUserLogin, ILoggedUser } from '../../types/user';
import * as IPC from '../../const/ipc';

type AuthData = ILoggedUser | null;

class AuthService {
  private mainWindow: BrowserWindow;

  private store: Store;

  private authData: AuthData;

  constructor(MainWindow: BrowserWindow) {
    this.mainWindow = MainWindow;
    this.store = new Store({
      name: 'auth'
    });
    this.authData = this.getExistingToken();

    this.store.onDidChange('auth', (newValue: AuthData) => {
      this.authData = newValue;
      const data = this.authData ? this.authData.username : null;
      this.mainWindow.webContents.send(IPC.AUTH.STATUS_CHANGED, data);
    });
  }

  private getExistingToken = () => {
    const authData: AuthData = this.store.get('auth');
    if (!authData || !authData.jwt || !authData.username) {
      return null;
    }
    return authData;
  };

  public login = async (data: IUserLogin) => {
    try {
      const response = await axios.post('/auth/login', data);
      const dataToStore: ILoggedUser = {
        jwt: response.data.accessToken,
        username: response.data.username
      };
      this.store.set('auth', dataToStore);
      return response;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  public checkStatus = () => {
    if (this.authData) {
      return this.authData.username;
    }
    return null;
  };

  public logout = () => {
    this.store.set('auth', null);
  };
}

export default AuthService;
