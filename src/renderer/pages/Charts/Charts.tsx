import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import log from 'electron-log';

const Charts = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          Sidebar stuff
        </Col>
        <Col xs={12} md={8}>
          Charts stuff
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
