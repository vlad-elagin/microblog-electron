import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { remote } from 'electron';

import Overlay from './Overlay/Overlay';
import log from 'electron-log';

interface SignUpProps {
  onSignup: Function;
  isLoading: boolean;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({ onSignup, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ ok: boolean; message: string } | null>(null);

  const onWindowClose = () => {
    remote.getCurrentWindow().close();
  };

  const signup = () => {
    onSignup({ username, password, confirmPassword }).then((error: string | null) => {
      log.info('che tam?', error);
      if (!error) {
        setMessage({ ok: true, message: 'Created!' });
        setTimeout(() => {
          setMessage(null);
          onWindowClose();
        }, 3000);
        return;
      }

      setUsername('');
      setPassword('');
      setConfirmPassword('');

      setMessage({ ok: false, message: error });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  return (
    <Form className="login-modal" onSubmit={signup}>
      {isLoading && <Overlay />}

      <FormGroup>
        <Label for="nickname-input">Username</Label>
        <Input
          required
          id="nickname-input"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="nickname-input">Password</Label>
        <Input
          required
          id="password-input"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="confirm-password-input">Confirm Password</Label>
        <Input
          required
          id="confirm-password-input"
          value={confirmPassword}
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
      </FormGroup>

      {message && <Alert color={message.ok ? 'success' : 'danger'}>{message.message}</Alert>}

      <Button color="primary" type="submit" disabled={message !== null}>
        Sign Up
      </Button>
      <Button color="link" onClick={onWindowClose}>
        Close
      </Button>
    </Form>
  );
};

export default SignUp;
