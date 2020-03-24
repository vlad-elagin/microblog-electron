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
      height: to === 'signup' ? 400 : 300,
      closable: true,
      show: false
    });
    loginWindow.loadURL(url.href);
    loginWindow.webContents.on('did-finish-load', () => {
      loginWindow.show();
    });
  };

  const onLogoutClick = () => {
    log.info('ren: logging out');
    ipc.callMain(AUTH.LOGOUT);
  };

  return <View username={username} onAuthClick={onAuthClick} onLogoutClick={onLogoutClick} />;
};

export default HeaderContainer;
