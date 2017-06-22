import React from 'react'
import styled from 'styled-components'
import ToDoList from '../components/todolist/ToDoList'

const Header = styled.h1`
    font-weight: bold;
`;

export class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header>To Do list</Header>
            <ToDoList />
        </div>
    }
}

export default MainPage;
