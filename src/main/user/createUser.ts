import axios from 'axios';

import { IUserCreate } from '../../types/user';

export const createUser = async (data: IUserCreate) => {
  try {
    const response = await axios.post('http://localhost:3000/user', data);
    return response;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
