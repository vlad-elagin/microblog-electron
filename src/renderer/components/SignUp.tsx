import React, { useReducer } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { remote } from 'electron';
import log from 'electron-log';

interface SignUpProps {
  onSignup: Function;
}

interface SignUpState {
  username: string;
  password: string;
  confirmPassword: string;
  response: {
    ok: boolean;
    message: string;
  } | null;
}

const initialState: SignUpState = {
  username: '',
  password: '',
  confirmPassword: '',
  response: null
};

const reducer = (state: SignUpState, action: { type: string; [index: string]: any }) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'CLEAR_FORM':
      return { ...initialState, response: action.response };
    case 'SET_RESPONSE':
      return { ...state, response: action.response };
    case 'CLEAR_RESPONSE':
      return { ...state, response: null };
    default:
      return state;
  }
};

const SignUp: React.FunctionComponent<SignUpProps> = ({ onSignup }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, password, confirmPassword, response } = state;

  const onWindowClose = () => {
    remote.getCurrentWindow().close();
  };

  const signup = () => {
    onSignup({ username, password, confirmPassword }).then((error: string | null) => {
      if (!error) {
        setTimeout(() => {
          dispatch({ type: 'CLEAR_RESPONSE' });
          onWindowClose();
        }, 3000);

        dispatch({ type: 'SET_RESPONSE', response: { ok: true, message: 'Created!' } });
        return;
      }

      log.info('errored, setting cb');
      setTimeout(() => {
        dispatch({ type: 'CLEAR_RESPONSE' });
      }, 3000);
      log.info('setting res and clearing inputs');
      dispatch({ type: 'CLEAR_FORM', response: { ok: false, message: error } });
    });
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    dispatch({ type: 'SET_FIELD', field: target.name, value: target.value });
  };

  return (
    <Form className="login-modal" onSubmit={signup}>
      <FormGroup>
        <Label for="nickname-input">Username</Label>
        <Input required id="nickname-input" name="username" value={username} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label for="nickname-input">Password</Label>
        <Input required id="password-input" name="password" value={password} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label for="confirm-password-input">Confirm Password</Label>
        <Input
          required
          id="confirm-password-input"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
        />
      </FormGroup>

      {response && <Alert color={response.ok ? 'success' : 'danger'}>{response.message}</Alert>}

      <Button color="primary" type="submit" disabled={response !== null}>
        Sign Up
      </Button>
      <Button color="link" onClick={onWindowClose}>
        Close
      </Button>
    </Form>
  );
};

export default SignUp;
