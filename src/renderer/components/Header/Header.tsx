import * as React from 'react';
import { Button } from 'reactstrap';
import { remote } from 'electron';
import { URL } from 'url';
import log from 'electron-log';

interface HeaderProps {
  username: string | null;
}

const Header: React.FunctionComponent<HeaderProps> = ({ username }) => {
  const onAuthClick = (to: string) => {
    let currentURL = remote.getCurrentWindow().webContents.getURL();
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

  const onLogoutClick = () => {};

  return (
    <header>
      <h3>Microblog Electron App</h3>
      {username && `Hello, ${username}`}
      {username ? (
        <Button outline color="primary" size="sm">
          Logout
        </Button>
      ) : (
        <>
          <Button outline color="primary" size="sm" onClick={() => onAuthClick('login')}>
            Login
          </Button>
          <Button outline color="primary" size="sm" onClick={() => onAuthClick('signup')}>
            Sign Up
          </Button>
        </>
      )}
    </header>
  );
};

export default Header;
