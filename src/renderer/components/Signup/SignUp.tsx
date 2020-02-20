import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { remote } from 'electron';

interface SignUpState {
    nickname: '';
    password: '';
    confirmPassword: '';
}

class SignUp extends React.Component<RouteComponentProps, SignUpState> {
    state: SignUpState = {
        nickname: '',
        password: '',
        confirmPassword: ''
    };

    close = () => {
        remote.getCurrentWindow().close();
    };

    onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({ [target.name]: target.value });
    };

    submit = () => {};

    render() {
        return (
            <Form className="login-modal">
                <FormGroup>
                    <Label for="nickname-input">Nickname</Label>
                    <Input
                        id="nickname-input"
                        name="nickname"
                        value={this.state.nickname}
                        onChange={this.onInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="nickname-input">Password</Label>
                    <Input
                        id="password-input"
                        name="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="confirm-password-input">Confirm Password</Label>
                    <Input
                        id="confirm-password-input"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <Button color="primary" onClick={this.submit}>
                    Sign Up
                </Button>
                <Button color="link" onClick={this.close}>
                    Close
                </Button>
            </Form>
        );
    }
}

export default SignUp;
