import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface LoginState {
    nickname: string;
    password: string;
}

class Login extends React.Component<RouteComponentProps, LoginState> {
    state: LoginState = {
        nickname: '',
        password: ''
    };

    onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="nickname-input">Nickname</Label>
                    <Input
                        id="nickname-input"
                        name="nickname"
                        value={this.state.nickname}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
            </Form>
        );
    }
}

export default Login;
