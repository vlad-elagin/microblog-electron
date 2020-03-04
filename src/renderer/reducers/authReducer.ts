import { Reducer } from 'redux';

import {
  // LOGIN_FAILURE,
  // LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  AUTH_LOADING,
  AuthAction
} from '../actions/authActions';

export interface AuthState {
  readonly username: string | null;
  readonly _id: string | null;
  readonly loading: boolean;
  readonly errors: string[];
}

const defaultState: AuthState = {
  _id: null,
  username: null,
  loading: false,
  errors: []
};

export const authReducer: Reducer<AuthState> = (state = defaultState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        errors: [action.payload],
        _id: null,
        username: null
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        errors: [],
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
