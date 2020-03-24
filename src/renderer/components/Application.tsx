import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../containers/LoginContainer';
import SignUp from '../containers/SignupContainer';
import Main from './Main/Main';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';

const Application: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/:username?" component={Main} />
      </Switch>
    </Router>
  );
};

export default hot(Application);
