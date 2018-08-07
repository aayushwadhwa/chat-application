import React, { Component } from 'react';
import ChatCell from './ChatCell/ChatCell';

class Chats extends Component {
    constructor(props) {
        super(props);
        this.chatcells = []; 
        this.chatClicked = this.chatClicked.bind(this);
        this.props.users.map(user => {
            this.chatcells.push(<ChatCell chatClicked={this.chatClicked} user={user}></ChatCell>);
        });
        this.state = {
            cells:this.chatcells
        }
    }

    chatClicked(event) {
        this.props.userSelected(event);
    }

    render() {
        return (
            <div>
                {this.state.cells}
            </div>
        );
    }
}

export default Chats;