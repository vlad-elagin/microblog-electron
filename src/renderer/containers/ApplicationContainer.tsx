import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { ipcRenderer as ipc } from 'electron-better-ipc';

import log from 'electron-log';
import UserContext, { UserData } from '../context/UserContext';
import { AUTH } from '../../const/ipc';
import View from '../components/Application';

const ApplicationContainer = () => {
  const [username, setUsername] = useState<UserData>(null);

  // get username from main process on initial render
  useEffect(() => {
    (async function getAuthData() {
      const loadedUsername: string = await ipc.callMain(AUTH.STATUS);
      log.info('got username', loadedUsername);
      setUsername(loadedUsername);
    })();
  }, []);

  // listen for auth status changes
  useEffect(() => {
    const listener = (newUserData: UserData) => {
      log.info(`called with ${newUserData}`);
      if (newUserData !== username) {
        setUsername(newUserData);
      }
    };

    ipcRenderer.on(AUTH.STATUS_CHANGED, listener);

    return () => {
      ipcRenderer.removeListener(AUTH.STATUS_CHANGED, listener);
    };
  }, []);

  return (
    <UserContext.Provider value={username}>
      <View />
    </UserContext.Provider>
  );
};

export default ApplicationContainer;
