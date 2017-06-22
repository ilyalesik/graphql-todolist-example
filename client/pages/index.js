import React from 'react'
import styled from 'styled-components'
import ToDoList from '../components/todolist/ToDoList'
import pageWithIntl from '../components/page-with-intl/PageWithIntl'
import {FormattedMessage} from 'react-intl'
import { bindActionCreators } from 'redux'
import { initStore, startClock, addCount, serverRenderClock, initIntl } from '../store'
import withRedux from 'next-redux-wrapper'

const Header = styled.h1`
    font-weight: bold;
`;

export class MainPage extends React.PureComponent {
    static getInitialProps (options) {
        const { store, isServer, req: {locale, messages} } = options;
        store.dispatch(serverRenderClock(isServer))
        store.dispatch(addCount());
        store.dispatch(initIntl({locale, messages}));

        return { isServer }
    }
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header><FormattedMessage id='index.todo' defaultMessage='ToDo!' /></Header>
            <ToDoList />
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: bindActionCreators(addCount, dispatch),
        startClock: bindActionCreators(startClock, dispatch),
        initIntl: bindActionCreators(initIntl, dispatch)
    }
};

const mapStateToProps = (state) => {
    return {
    }
};


export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(pageWithIntl(MainPage));
