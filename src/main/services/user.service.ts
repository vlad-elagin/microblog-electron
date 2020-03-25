import axios from 'axios';

import { IUserCreate } from '../../types/user';

class UserService {
  createUser = async (data: IUserCreate) => {
    try {
      const response = await axios.post('/user', data);
      return response;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}

export default UserService;
