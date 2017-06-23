import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import { gql, graphql, compose } from 'react-apollo'


export class ToDoList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
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
        this.props.createTodoItem(this.state.inputValue);
        this.setState((prevState) => {
            return {
                inputValue: '',
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

const todoItems = gql`
  query {
      todoitems {
        _id
        text
      }
  }
`;

const createTodoItem = gql`
    mutation createTodoItem($text: String!) {
      createTodoItem(text: $text) {
        _id
        text
      }
    }
`;

export default compose(
    graphql(todoItems, {
        props: ({ data }) => ({
            todoitems: data.todoitems
        })}),
    graphql(createTodoItem, {
        props: ({ mutate }) => ({
            createTodoItem: (text) => mutate({
                variables: { text },
                updateQueries: {
                    todoitems: (previousResult, { mutationResult }) => {
                        const newItem = mutationResult.data.createTodoItem
                        return Object.assign({}, previousResult, {
                            // Append the new post
                            todoitems: [newItem, ...previousResult.todoitems]
                        })
                    }
                }
            })
        })
    })
)(ToDoList);