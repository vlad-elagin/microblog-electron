import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { remote } from 'electron';
import log from 'electron-log';

import { IUserCreate } from '../../types/user';
import Overlay from './Overlay/Overlay';

interface SignUpProps {
  onSignup: Function;
  isLoading: boolean;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({ onSignup, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onWindowClose = () => {
    remote.getCurrentWindow().close();
  };

  const signup = () => {
    log.info('%csubmitting', 'color: magenta');
    onSignup({ username, password, confirmPassword });
  };

  return (
    <Form className="login-modal" onSubmit={signup}>
      {isLoading && <Overlay />}

      <FormGroup>
        <Label for="nickname-input">Username</Label>
        <Input
          id="nickname-input"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="nickname-input">Password</Label>
        <Input
          id="password-input"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="confirm-password-input">Confirm Password</Label>
        <Input
          id="confirm-password-input"
          value={confirmPassword}
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Sign Up
      </Button>
      <Button color="link" onClick={onWindowClose}>
        Close
      </Button>
    </Form>
  );
};

export default SignUp;
