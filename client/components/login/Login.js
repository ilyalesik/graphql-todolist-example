import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import { gql, graphql, compose } from 'react-apollo'


export class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changeLogin(e) {
        this.setState({login: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return <div>
            <label>
                <FormattedMessage id='login.login' defaultMessage='Login' />
            </label>
            <input type="text" value={this.state.login} onChange={this.changeLogin} />
            <label>
                <FormattedMessage id='login.password' defaultMessage='Password' />
            </label>
            <input type="password" value={this.state.password} onChange={this.changePassword} />
            <button>
                <FormattedMessage id='login.button' defaultMessage='Login' />
            </button>
        </div>
    }
}

export default Login;