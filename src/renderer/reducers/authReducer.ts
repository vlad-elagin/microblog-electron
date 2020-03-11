import { Reducer } from 'redux';
import log from 'electron-log';

import {
  // LOGIN_FAILURE,
  // LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  AuthAction
} from '../actions/authActions';

export interface AuthState {
  readonly username: string | null;
  readonly _id: string | null;
}

const defaultState: AuthState = {
  _id: null,
  username: null
};

export const authReducer: Reducer<AuthState> = (state = defaultState, action: AuthAction) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {
        ...state,
        _id: null,
        username: null
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    // case LOGIN_FAILURE:
    //     return {
    //         ...state,
    //         value: state.value + 1
    //     };
    // case LOGIN_SUCCESS:
    //     return {
    //         ...state,
    //         value: state.value - 1
    //     };

    default:
      return state;
  }
};
