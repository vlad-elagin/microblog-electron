import * as React from 'react';
import { Button } from 'reactstrap';

interface HeaderProps {
  username: string | null;
  onAuthClick: Function;
}

const Header: React.FunctionComponent<HeaderProps> = ({ username, onAuthClick }) => {
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
