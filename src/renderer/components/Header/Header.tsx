import * as React from 'react';
import { Button } from 'reactstrap';

interface HeaderProps {
  username: string | null;
  onAuthClick: Function;
  onLogoutClick: React.MouseEventHandler;
}

const Header: React.FunctionComponent<HeaderProps> = ({ username, onAuthClick, onLogoutClick }) => {
  return (
    <header>
      <h3>Microblog Electron App</h3>
      {username && `Hello, ${username}`}
      {username ? (
        <Button outline color="primary" size="sm" onClick={onLogoutClick}>
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
