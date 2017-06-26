import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { gql, graphql, compose } from 'react-apollo';
import { login } from '../../store'

const Login = styled.div`
    margin-top: 50px;
`;


export class LoginComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    changeLogin(e) {
        this.setState({login: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    loginClick() {
        this.props.login(this.state.login, this.state.password);
    }

    render() {
        return <Login>
            {!this.props.isAuthorized ? <div>
                <div>
                    <label>
                        <FormattedMessage id='login.login' defaultMessage='Login' />
                    </label>
                    <input type="text" value={this.state.login} onChange={this.changeLogin} />
                </div>
                <div>
                    <label>
                        <FormattedMessage id='login.password' defaultMessage='Password' />
                    </label>
                    <input type="password" value={this.state.password} onChange={this.changePassword} />
                </div>
                <div>
                    <button onClick={this.loginClick}>
                        <FormattedMessage id='login.button' defaultMessage='Login' />
                    </button>
                </div>
            </div> : <div>
                {this.props.firstName} {this.props.lastName}
            </div>}


        </Login>
    }
}

const mapStateToProps = ({ auth: {isAuthorized, login, firstName, lastName} }) => ({ isAuthorized, login, firstName, lastName });

const mapDispatchToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);