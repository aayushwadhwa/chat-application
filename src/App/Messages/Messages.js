import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import MessageCell from './MessageCell/MessageCell';
import MessageTextBox from './MessageTextBox/MessageTextBox';
import './Messages.css'
import Axios from 'axios';
import { variables } from './../../variables';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.update = false;
        this.state = {
            messages: [],
            username: this.props.username,
            selectedUser: this.props.selectedUser,
            receiverId: null
        }
        const self = this;
        this.props.socket.on('Refresh Message API', function(response) {
            if (response.from === self.props.selectedUser.username || response.from === self.state.username) {
                self.setState({messages: response.data.value});
            }
        })
    }
    getMessages(newProps) {
        let self = this;
        const request = {
            'from': newProps.selectedUser.username,
            'to': newProps.username
        }
      if (request.from && request.to) {
          if (request.from.length && request.to.length) {
              Axios.post(variables.apiUrl + 'messages', request).then(function(response) {
                  if (response.data.status === 'SUCCESS') {
                      self.update = true;
                    self.setState({messages: response.data.value});
                  } else {
                    console.log(response.data);
                  }
              })
              .catch(function(error) {
                  console.log(error);
              }) 
          }
      }
    }
    componentWillReceiveProps(props) {
        this.getMessages(props);
    }
    componentDidMount() {
        this.getMessages(this.props);
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row className="message-area">
                    <MessageCell messages={this.state.messages} update={this.update} socket={this.props.socket}/>
                </Row>
                <Row>
                    <div className="fixed-at-bottom width-100">
                        <MessageTextBox username={this.props.username} selectedUser={this.props.selectedUser} socket={this.props.socket} 
                        receiverId={this.state.receiverId}/>
                    </div>
                </Row>
            </Grid>
        );
    }
}

export default Messages;