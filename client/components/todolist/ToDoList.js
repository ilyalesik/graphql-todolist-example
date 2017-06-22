import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'


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
            {this.state.items.map((item, key)=>{
                return <div key={key}>{item.text}</div>
            })}
        </div>
    }
}

export default ToDoList;