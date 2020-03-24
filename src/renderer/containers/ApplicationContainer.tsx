import React, { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

import UserContext, { UserData } from '../context/UserContext';
import { AUTH } from '../../const/ipc';
import View from '../components/Application';

const ApplicationContainer = () => {
  // get username from main process on initial render
  const [username, setUsername] = useState<UserData>(null);
  useEffect(() => {
    (async function getAuthData() {
      const loadedUsername: string = await ipc.callMain(AUTH.STATUS);
      setUsername(loadedUsername);
    })();
  }, []);

  return (
    <UserContext.Provider value={username}>
      <View />
    </UserContext.Provider>
  );
};

export default ApplicationContainer;
