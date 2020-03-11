import { Action, ActionCreator, Dispatch } from 'redux';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import log from 'electron-log';

import { IUserCreate, IUser } from '../../types/user';

export const AUTH_LOADING = 'AUTH_LOADING';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// =========== LOADING ==========
export interface ISetAuthLoadingState extends Action {
  type: 'AUTH_LOADING';
  payload: boolean;
}

const setAuthLoadingState: ActionCreator<ISetAuthLoadingState> = (value: boolean) => ({
  type: AUTH_LOADING,
  payload: value
});

// =========== LOGIN ============

export interface LoginSuccessAction extends Action {
  type: 'LOGIN_SUCCESS';
}
export interface LoginFailureAction extends Action {
  type: 'LOGIN_FAILURE';
}

// export const login: ActionCreator<LoginAction> = () => ({
//   type: LOGIN
// });

// export const loginSuccess: ActionCreator<LoginSuccessAction> = () => ({
//   type: LOGIN_SUCCESS
// });
// export const loginFailure: ActionCreator<LoginFailureAction> = () => ({
//   type: LOGIN_FAILURE
// });

// =========== SIGNUP ===========

export interface SignupSuccessAction extends Action {
  type: 'SIGNUP_SUCCESS';
  payload: IUser;
}

export interface SignupFailureAction extends Action {
  type: 'SIGNUP_FAILURE';
  payload: string;
}

export type SignupAction = SignupSuccessAction | SignupFailureAction | ISetAuthLoadingState;

export const signupSuccess: ActionCreator<SignupSuccessAction> = (user: IUser) => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

export const signupFailure: ActionCreator<SignupFailureAction> = (errorMessage: string) => ({
  type: SIGNUP_FAILURE,
  payload: errorMessage
});

export const signup = (data: IUserCreate) => {
  return async (dispatch: Dispatch): Promise<string | null> => {
    dispatch(setAuthLoadingState(true));

    try {
      if (data.password !== data.confirmPassword) {
        log.info('passes dont match');
        throw new Error('Password and confirm-password do not match.');
      }

      await ipc.callMain('user.create', data);

      dispatch(setAuthLoadingState(false));

      return null;
    } catch (err) {
      log.info(err);
      dispatch(setAuthLoadingState(false));
      return err.message;
    }
  };
};

export type AuthAction =
  | ISetAuthLoadingState
  //   | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  //   | SignupAction
  | SignupSuccessAction
  | SignupFailureAction;
