export interface IUserCreate {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  _id: string;
  username: string;
}
