import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar data-role="navbar">
      <Nav>
        <NavItem>
          <Link to="/" className="nav-link" replace data-role="link-home">
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/charts" className="nav-link" data-role="link-charts">
            D3 Charts
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
