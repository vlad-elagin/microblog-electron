import { createContext } from 'react';

export type UserData = string | null;
const UserContext = createContext<UserData>(null);

export default UserContext;
