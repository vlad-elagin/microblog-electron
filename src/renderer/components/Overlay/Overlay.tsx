import React from 'react';
import { Spinner } from 'reactstrap';

const Overlay: React.FunctionComponent = () => (
  <div className="overlay">
    <Spinner color="primary" />
  </div>
);

export default Overlay;
