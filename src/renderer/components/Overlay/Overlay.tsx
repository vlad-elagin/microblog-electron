import React from 'react';
import { Spinner } from 'reactstrap';

const Overlay: React.FunctionComponent = () => (
  <div className="overlay" onClick={() => false}>
    <Spinner color="primary" />
  </div>
);

export default Overlay;
