import { combineReducers } from 'redux';

import { CounterState, counterReducer } from './counterReducer';
import { AuthState, authReducer } from './authReducer';

export interface RootState {
    counter: CounterState;
    auth: AuthState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    counter: counterReducer,
    auth: authReducer
});
