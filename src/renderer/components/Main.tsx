import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import Header from '../containers/HeaderContainer';
import Landing from './Landing/Landing';

const Main = () => (
  <main>
    <Header />
    <Landing />
    {/* <Container fluid></Container> */}
  </main>
);

export default Main;
