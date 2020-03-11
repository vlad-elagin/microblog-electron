import React from 'react';
import { useDispatch } from 'react-redux';

import { signup } from '../actions/authActions';
import View from '../components/Signup';
import { IUserCreate } from '../../types/user';

const SignupContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onSignup = async (data: IUserCreate) => {
    return dispatch(signup(data));
  };

  return <View onSignup={onSignup} />;
};

export default SignupContainer;
