import * as React from 'react';
import { Button } from 'reactstrap';
import { remote } from 'electron';
import { URL } from 'url';

interface HeaderProps {
    username: string | null;
}

// let win = new remote.BrowserWindow({
//     parent: remote.getCurrentWindow(),
//     modal: true
// });

// var theUrl = 'file://' + __dirname + '/modal.html';
// console.log('url', theUrl);

// win.loadURL(theUrl);

const Header: React.FunctionComponent<HeaderProps> = ({ username }) => {
    const onLoginClick: React.MouseEventHandler = () => {
        let currentURL = remote.getCurrentWindow().webContents.getURL();
        console.log(currentURL);
        const url = new URL(currentURL);
        url.hash = 'login';
        console.log('next url', url);
        const loginWindow = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal: true,
            title: 'Login to Microblog!',
            resizable: false,
            width: 300,
            height: 400,
            closable: true
        });
        loginWindow.loadURL(url.href);
    };

    const onSignupClick = () => {};

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
                    <Button outline color="primary" size="sm" onClick={onLoginClick}>
                        Login
                    </Button>
                    <Button outline color="primary" size="sm">
                        Sign Up
                    </Button>
                </>
            )}
        </header>
    );
};

export default Header;
