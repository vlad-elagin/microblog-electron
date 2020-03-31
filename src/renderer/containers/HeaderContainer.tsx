import React, { useContext } from 'react';
import { remote } from 'electron';
import { URL } from 'url';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import log from 'electron-log';

import UserContext from '../context/UserContext';
import View from '../components/Header/Header';
import { AUTH } from '../../const/ipc';

const HeaderContainer: React.FunctionComponent = () => {
  const username = useContext(UserContext);

  const onAuthClick = (to: string) => {
    const currentURL = remote.getCurrentWindow().webContents.getURL();
    const url = new URL(currentURL);
    url.hash = to;

    const loginWindow = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      title: `${to} to Microblog!`,
      resizable: false,
      width: 300,
      height: 450,
      closable: true,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    loginWindow.loadURL(url.href);
    loginWindow.webContents.once('dom-ready', () => {
      // loginWindow.webContents.openDevTools();
      loginWindow.show();
    });
  };

  const onLogoutClick = () => {
    ipc.callMain(AUTH.LOGOUT);
  };

  return <View username={username} onAuthClick={onAuthClick} onLogoutClick={onLogoutClick} />;
};

export default HeaderContainer;
