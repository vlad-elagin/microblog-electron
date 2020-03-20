import axios from 'axios';
import Store from 'electron-store';

import { IUserLogin, ILoggedUser } from '../../types/user';

class AuthService {
  private store: Store;
  private authData: ILoggedUser | null;

  constructor() {
    this.store = new Store();
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
        jwt: response.data.access_token,
        username: response.data.username
      };

      this.store.set('auth', dataToStore);
      return response;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  public checkStatus = () => {
    return this.authData;
  };
}

export default new AuthService();
