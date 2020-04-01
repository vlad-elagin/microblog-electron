import axios from 'axios';

import { IUserCreate } from '../../types/user';

class UserService {
  createUser = async (data: IUserCreate) => {
    try {
      const response = await axios.post('/user', data);
      return response;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      }
      throw new Error("Can't connect to server. Ensure that it is running and accessible.");
    }
  };
}

export default UserService;
