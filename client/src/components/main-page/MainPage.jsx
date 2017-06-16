import React from 'react';
import classNames from 'classnames';
import s from './mainPage.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="">
            <h1 className={s['main-page_header']}>ToDo</h1>
        </div>
    }
}

export default withStyles(s)(MainPage);