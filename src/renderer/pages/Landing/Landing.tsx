import React from 'react';
import { Jumbotron } from 'reactstrap';

const Landing: React.FunctionComponent = () => {
  return (
    <Jumbotron fluid className="landing">
      <h1 className="display-4">Welcome to Microblog!</h1>
      <p className="lead">Please log in or register.</p>
    </Jumbotron>
  );
};

export default Landing;
