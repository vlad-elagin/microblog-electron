import React, { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

import UserContext, { UserData } from '../context/UserContext';
import { AUTH } from '../../const/ipc';
import View from '../components/Application';

const ApplicationContainer = () => {
  const [username, setUsername] = useState<UserData>(null);

  // get username from main process on initial render
  useEffect(() => {
    (async function getAuthData() {
      const loadedUsername: string = await ipc.callMain(AUTH.STATUS);
      setUsername(loadedUsername);
    })();
  }, []);

  // listen for auth status changes
  useEffect(() => {
    const listener = (_: any, newUserData: UserData) => {
      setUsername(newUserData);
    };

    ipc.on(AUTH.STATUS_CHANGED, listener);

    return () => {
      ipc.removeListener(AUTH.STATUS_CHANGED, listener);
    };
  }, []);

  return (
    <UserContext.Provider value={username}>
      <View />
    </UserContext.Provider>
  );
};

export default ApplicationContainer;
