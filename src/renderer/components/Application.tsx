import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../containers/LoginContainer';
import SignUp from '../containers/SignupContainer';
import Landing from '../pages/Landing/Landing';
import Charts from '../pages/Charts/Charts';
import Header from '../containers/HeaderContainer';
import Navigation from './Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';

const Application: React.FunctionComponent = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route>
          <main>
            <Header />
            <Navigation />

            <Switch>
              <Route path="/charts" component={Charts} />
              {/* TODO add verification of logged in user and show landing or microblog component */}
              <Route component={Landing} />
            </Switch>
          </main>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(Application);
