import React, { useReducer, useCallback } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

import View from '../components/Login/Login';
import { AUTH } from '../../const/ipc';

interface LoginState {
  username: string;
  password: string;

  response: {
    ok: boolean;
    message: string;
  } | null;
}

const initialState: LoginState = {
  username: '',
  password: '',
  response: null
};

const reducer = (state: LoginState, action: { type: string; [index: string]: any }) => {
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

const LoginContainer: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password } = state;

  const onLogin = useCallback(async () => {
    try {
      await ipc.callMain(AUTH.LOGIN, {
        username,
        password
      });
      return null;
    } catch (err) {
      return err.message;
    }
  }, [username, password]);

  return <View onLogin={onLogin} dispatch={dispatch} {...state} />;
};

export default LoginContainer;
