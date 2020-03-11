import axios from 'axios';

import { IUserCreate } from '../../types/user';

export const createUser = (data: IUserCreate) => {
  // TODO
  return axios.post('http://localhost:3000/user', data).then(res => {
    return Promise.resolve(res);
  });
};
