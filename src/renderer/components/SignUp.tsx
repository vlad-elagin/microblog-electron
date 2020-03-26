import React, { useCallback, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { remote } from 'electron';

interface SignUpProps {
  onSignup: Function;
  dispatch: Function;
  username: string;
  password: string;
  confirmPassword: string;
  response: any;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({
  onSignup,
  dispatch,
  username,
  password,
  confirmPassword,
  response
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

  const signup = (event: React.FormEvent) => {
    event.preventDefault();

    onSignup().then((error: string | null) => {
      if (!error) {
        dispatch({
          type: 'SET_RESPONSE',
          response: { ok: true, message: 'Created! You can log in now.' }
        });
        return;
      }

      dispatch({ type: 'CLEAR_FORM', response: { ok: false, message: error } });
    });
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    dispatch({ type: 'SET_FIELD', field: target.name, value: target.value });
  };

  return (
    <Form className="login-modal" onSubmit={signup}>
      <FormGroup>
        <Label for="username-input">Username</Label>
        <Input required id="username-input" name="username" value={username} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label for="nickname-input">Password</Label>
        <Input
          required
          id="password-input"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          />
      </FormGroup>

      <FormGroup>
        <Label for="confirm-password-input">Confirm Password</Label>
        <Input
          required
          id="confirm-password-input"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
          />
      </FormGroup>

      {response && <Alert color={response.ok ? 'success' : 'danger'}>{response.message}</Alert>}

      <Button color="primary" type="submit" disabled={response !== null}>
        Sign Up
      </Button>
      <Button color="link" onClick={onWindowClose} data-role="close">
        Close
      </Button>
    </Form>
  );
};

export default SignUp;
