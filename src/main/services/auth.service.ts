import axios from 'axios';
import Store from 'electron-store';

import log from 'electron-log';

import { IUserLogin, ILoggedUser } from '../../types/user';

class AuthService {
  private store: Store;

  private authData: ILoggedUser | null;

  constructor() {
    this.store = new Store({
      name: 'auth'
    });
    this.authData = this.getExistingToken();
  }

  private getExistingToken = () => {
    const authData: ILoggedUser = this.store.get('auth');
    if (!authData || !authData.jwt || !authData.username) {
      return null;
    }
    return authData;
  };

  public login = async (data: IUserLogin) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', data);
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
    log.info('main: log out');
    // TODO: call ren to notify about logging out
    this.store.clear();
  };
}

export default new AuthService();
