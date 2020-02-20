import { Action, ActionCreator } from 'redux';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export interface LoginAction extends Action {
    type: 'LOGIN';
}
export interface LoginSuccessAction extends Action {
    type: 'LOGIN_SUCCESS';
}
export interface LoginFailureAction extends Action {
    type: 'LOGIN_FAILURE';
}

export interface SignupAction extends Action {
    type: 'SIGNUP';
}
export interface SignupSuccessAction extends Action {
    type: 'SIGNUP_SUCCESS';
}
export interface SignupFailureAction extends Action {
    type: 'SIGNUP_FAILURE';
}

export const login: ActionCreator<LoginAction> = () => ({
    type: LOGIN
});
export const loginSuccess: ActionCreator<LoginSuccessAction> = () => ({
    type: LOGIN_SUCCESS
});
export const loginFailure: ActionCreator<LoginFailureAction> = () => ({
    type: LOGIN_FAILURE
});

export const signup: ActionCreator<SignupAction> = () => ({
    type: SIGNUP
});
export const signupSuccess: ActionCreator<SignupSuccessAction> = () => ({
    type: SIGNUP_SUCCESS
});
export const signupFailure: ActionCreator<SignupFailureAction> = () => ({
    type: SIGNUP_FAILURE
});

export type AuthAction =
    | LoginAction
    | LoginSuccessAction
    | LoginFailureAction
    | SignupAction
    | SignupSuccessAction
    | SignupFailureAction;
