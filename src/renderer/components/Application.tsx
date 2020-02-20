import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login/Login';
import SignUp from './SignUp';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';

const Application = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/:username?" component={Main} />
        </Switch>
    </Router>
);

export default hot(Application);
