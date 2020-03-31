import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar>
      <Nav>
        <NavItem>
          <Link to="/" className="nav-link" replace>
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/charts" className="nav-link">
            D3 Charts
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
