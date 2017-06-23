import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import { gql, graphql } from 'react-apollo'


export class ToDoList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            items: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleAddClick() {
        this.setState((prevState) => {
            return {
                inputValue: '',
                items: [...prevState.items, {text: prevState.inputValue}]
            };
        })
    }

    render() {
        return <div>
            <div>
                <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}/>
                <button onClick={this.handleAddClick}>
                    <FormattedMessage id='todolist.add' defaultMessage='Add' />
                </button>
            </div>
            {this.props.todoitems.map((item, key)=>{
                return <div key={item._id}>{item.text}</div>
            })}
        </div>
    }
}

const allPosts = gql`
  query {
      todoitems {
        _id
        text
      }
  }
`;

export default graphql(allPosts, {
    props: ({ data }) => ({
        todoitems: data.todoitems
    })
})(ToDoList);