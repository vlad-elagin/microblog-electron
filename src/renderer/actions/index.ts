import { CounterAction } from './counterActions';
import { AuthAction } from './authActions';

export type RootActions = CounterAction[keyof CounterAction | keyof AuthAction];
