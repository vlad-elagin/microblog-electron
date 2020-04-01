import React from 'react';
import { Jumbotron } from 'reactstrap';

const Landing: React.FunctionComponent = () => {
  return (
    <Jumbotron fluid className="landing">
      <h1 className="display-4" data-role="page-heading">
        Welcome to Microblog!
      </h1>
      <p className="lead">
        Please log in or register in order to access microblog features. You can navigate charts
        page without authentification.
      </p>
    </Jumbotron>
  );
};

export default Landing;
