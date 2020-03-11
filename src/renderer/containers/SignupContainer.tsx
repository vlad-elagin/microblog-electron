import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../actions/authActions';
import View from '../components/Signup';
import { IUserCreate } from '../../types/user';
import { RootState } from '../reducers/index';
import log from 'electron-log';

const SignupContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onSignup = async (data: IUserCreate) => {
    return dispatch(signup(data));
  };

  const { isLoading } = useSelector((state: RootState) => {
    return { isLoading: state.auth.loading };
  });

  return <View onSignup={onSignup} isLoading={isLoading} />;
};

export default SignupContainer;
