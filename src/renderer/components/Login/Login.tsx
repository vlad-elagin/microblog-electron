import React, { useCallback, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { remote } from 'electron';

interface LoginProps {
  username: string;
  password: string;
  response: any;
  onLogin: Function;
  dispatch: Function;
}

const Login: React.FunctionComponent<LoginProps> = ({
  username,
  password,
  response,
  dispatch,
  onLogin
}) => {
  const onWindowClose = useCallback(() => {
    remote.getCurrentWindow().close();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (response) {
      timeoutId = setTimeout(() => {
        if (response.ok) {
          return onWindowClose();
        }
        return dispatch({ type: 'CLEAR_RESPONSE' });
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [response]);

  const onInputChange = ({ target }: { target: HTMLInputElement }) => {
    dispatch({ type: 'SET_FIELD', field: target.name, value: target.value });
  };

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin().then((error: string | null) => {
      if (!error) {
        dispatch({ type: 'SET_RESPONSE', response: { ok: true, message: 'Logged in!' } });
        return;
      }

      dispatch({ type: 'CLEAR_FORM', response: { ok: false, message: error } });
    });
  };

  return (
    <Form className="login-modal" onSubmit={login}>
      <FormGroup>
        <Label for="username-input">Username</Label>
        <Input
          id="username-input"
          name="username"
          value={username}
          onChange={onInputChange}
          required
          />
      </FormGroup>

      <FormGroup>
        <Label for="nickname-input">Password</Label>
        <Input
          id="password-input"
          name="password"
          value={password}
          onChange={onInputChange}
          required
          />
      </FormGroup>

      {response && <Alert color={response.ok ? 'success' : 'danger'}>{response.message}</Alert>}

      <Button color="primary" type="submit" disabled={response !== null}>
        Log In
      </Button>
      <Button color="link" onClick={onWindowClose}>
        Close
      </Button>
    </Form>
  );
};

export default Login;
