import React, { useReducer, useCallback } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import log from 'electron-log';

import View from '../components/Signup';
import { IUserCreate } from '../../types/user';

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

const SignupContainer: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, confirmPassword, ...x } = state;

  const onSignup = useCallback(async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Password and confirm-password do not match.');
      }

      await ipc.callMain('user.create', {
        username,
        password,
        confirmPassword
      });
      return null;
    } catch (err) {
      return err.message;
    }
  }, [username, password, confirmPassword]);

  return <View onSignup={onSignup} {...state} dispatch={dispatch} />;
};

export default SignupContainer;
