import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { remote } from 'electron';

interface LoginState {
    nickname: string;
    password: string;
}

class Login extends React.Component<RouteComponentProps, LoginState> {
    state: LoginState = {
        nickname: '',
        password: ''
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
                <Button color="primary" onClick={this.submit}>
                    Log In
                </Button>
                <Button color="link" onClick={this.close}>
                    Close
                </Button>
            </Form>
        );
    }
}

export default Login;