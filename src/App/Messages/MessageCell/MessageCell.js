import React, { Component } from 'react';
import { Row, Grid } from 'react-bootstrap';
import './MessageCell.css';
import { variables } from './../../../variables';

class MessageCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageElements: [],
            update: this.props.update
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ update: true })
    }
    componentDidUpdate(prevProp, prevState, snapshot) {
        let messageElements = [];
        for (let i = 0; i < this.props.messages.length; i++) {
            messageElements.push(this.getMessageElement(this.props.messages[i]));
        }
        if (this.state.update) {
            this.setState({ messageElements: messageElements, update: false });
        }
    }

    getMessageElement(message) {
        return (
            <Grid fluid={false} className="message-cell">
                <Row>
                    <div className="message-from">{message.from}</div>
                </Row>
                <Row>
                    <div className="message">{message.message}</div>
                </Row>
            </Grid>
        )
    }
    render() {
        return (
            <div className="width-50">
                {this.state.messageElements}
            </div>

        );
    }
}

export default MessageCell;