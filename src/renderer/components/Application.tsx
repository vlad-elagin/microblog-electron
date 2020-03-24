import { hot } from 'react-hot-loader/root';
import React, { createContext, useEffect, useRef } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import log from 'electron-log';

import { AUTH } from '../../const/ipc';
import Login from '../containers/LoginContainer';
import SignUp from '../containers/SignupContainer';
import Main from './Main';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';

const UserContext = createContext<string | null>(null);

const Application = () => {
  // get username from main process on initial render
  const username = useRef<string | null>(null);
  useEffect(() => {
    (async function getAuthData() {
      const authData: { username: string } = await ipc.callMain(AUTH.STATUS);
      username.current = authData.username;
    })();
  }, []);

  log.info(username.current);

  // listen to changes in auth status
  // useEffect(() => {}, []);

  return (
    <UserContext.Provider value={username.current}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/:username?" component={Main} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default hot(Application);
