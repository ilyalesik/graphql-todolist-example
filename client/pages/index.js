import React from 'react'
import styled from 'styled-components'
import ToDoList from '../components/todolist/ToDoList'
import pageWithIntl from '../components/page-with-intl/PageWithIntl'
import {FormattedMessage} from 'react-intl'
import { bindActionCreators } from 'redux'
import {  startClock, addCount, serverRenderClock, initIntl } from '../store'
import initRedux from '../initRedux'
import withRedux from 'next-redux-wrapper'
import ChangeLanguage from '../components/language-changer/LaungageChanger'
import withData from '../withData'
import { connect } from 'react-redux'

import './index.css'

const Header = styled.h1`
    font-weight: bold;
    flex: 1;
`;

export class MainPage extends React.PureComponent {
    static getInitialProps (options) {
    }
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div className="nav">
                <Header>
                    <FormattedMessage id='index.todo' defaultMessage='ToDo!' />
                </Header>
                <ChangeLanguage />
            </div>

            <ToDoList />
        </div>
    }
}


export default withData(pageWithIntl(MainPage));
