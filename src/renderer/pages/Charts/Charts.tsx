import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Sidebar from '../../containers/ChartSidebarContainer';
import ChartsWrapper from '../../components/Charts/ChartWrapper';

const Charts = () => {
  return (
    <Container>
      <h1 className="h4" data-role="page-heading">
        Charts
      </h1>
      <Row>
        <Col xs={12} md={4}>
          <Sidebar />
        </Col>
        <Col xs={12} md={8}>
          <ChartsWrapper />
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
