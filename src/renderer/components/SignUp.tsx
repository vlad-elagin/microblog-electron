import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SignUpState {
    username: '';
    password: '';
    confirmPassword: '';
}

class SignUp extends React.Component<RouteComponentProps, SignUpState> {
    state: SignUpState = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    render() {
        return <div>signup page</div>;
    }
}

export default SignUp;
