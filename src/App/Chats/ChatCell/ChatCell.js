import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './ChatCell.css'

class ChatCell extends Component {
    constructor(props) {
        super(props);
        this.userClicked = this.userClicked.bind(this);
    }
    userClicked(event) {
        this.props.chatClicked(this.props.user);
    }
    render() {
        return (
            <div onClick={this.userClicked} className="chat-cell-click">
                <Grid className="chat-cell">
                    <Row>
                        <Col md={10} lg={10}>{this.props.user.username}</Col>
                        <Col md={2} lg={2}><div className={this.props.user.online ? 'online' : 'offline'}></div></Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ChatCell;