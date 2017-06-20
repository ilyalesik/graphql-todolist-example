import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components'

const Header = styled.h1`
    color: red;
`;

export class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="">
            <Header>ToDo</Header>
        </div>
    }
}

export default MainPage;