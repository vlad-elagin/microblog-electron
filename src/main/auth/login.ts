import axios from 'axios';

import { IUserLogin } from '../../types/user';

export const login = async (data: IUserLogin) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', data);
    return response;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
