import React, { Component } from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import './MessageTextBox.css'
import Axios from 'axios';
import { variables } from './../../../variables';

class MessageTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        const self = this;
        this.send = this.sendMessage.bind(this);
        this.messageChanged = this.messageChanged.bind(this);
        this.props.socket.on('Refresh Message API', function(response) {
            if (response.data.statue === 'SUCCESS') {
                self.setState({message: ''});
            }
        })
    }

    messageChanged(event) {
        this.setState({ 'message': event.target.value });
    }
    sendMessage(event) {
        let self = this;
        const request = {
            'from': this.props.username,
            'to': this.props.selectedUser.username,
            'message': this.state.message,
            'time': new Date(),
        }
        if (request.from && request.to && request.message) {
            if (request.from.length && request.to.length && request.message.length) {
                // Axios.post(variables.apiUrl + 'send', request).then(function(response) {
                //     if (response.data.status === 'SUCCESS') {
                //       self.setState({message: ''});
                        self.props.socket.emit('messageSent', {'body': request});
                    // } else {
                    //   console.log(response.data);
                    // }
                // })
                // .catch(function(error) {
                    // console.log(error);
                // }) 
            }
        }
    }
    render() {
        return (
            <Row>
                <Col md={11} lg={11}>
                    <FormControl className="width-100" value={this.state.message} onChange={this.messageChanged}></FormControl>
                </Col>
                <Col md={1} lg={1}>
                    <Button bsStyle="success" onClick={this.send}>Send</Button>
                </Col>
            </Row>
        );
    }
}

export default MessageTextBox;