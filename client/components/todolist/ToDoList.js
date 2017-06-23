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
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

    handleDeleteClick(_id) {
        this.props.markTodoItemDeleted(_id);
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
                return <div key={item._id}>
                    {item.text}
                    <button onClick={()=>this.handleDeleteClick(item._id)}>
                        <FormattedMessage id='todolist.delete' defaultMessage='Delete' />
                    </button>
                </div>
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

const markTodoItemDeleted = gql`
    mutation markDeleted($_id: String) {
      markDeleted(_id: $_id) {
        _id
        text
        deleted
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
                update: (store, { data: { createTodoItem } }) => {
                    const data = store.readQuery({ query: todoItems });
                    // Add our comment from the mutation to the end.
                    data.todoitems.push(createTodoItem);
                    // Write our data back to the cache.
                    store.writeQuery({ query: todoItems, data });
                }
            })
        })
    }),
    graphql(markTodoItemDeleted, {
        props: ({ mutate }) => ({
            markTodoItemDeleted: (_id) => mutate({
                variables: { _id },
                update: (store, { data: { markDeleted } }) => {
                    const data = store.readQuery({ query: todoItems });
                    data.todoitems = data.todoitems.filter((item)=>item._id !== _id);
                    store.writeQuery({ query: todoItems, data });
                }
            })
        })
    })
)(ToDoList);