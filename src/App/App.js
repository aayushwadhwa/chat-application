import React, { Component } from 'react';
import Chats from './Chats/Chats';
import Messages from './Messages/Messages';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Navbar/Navbar';
import SignLogModal from './SignLogModal/SignLogModal';
import socketIOClient from "socket.io-client";
import { variables } from './../variables';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      username: '',
      users: [],
      selectedUser: ''
    }
    this.updatedData = this.updatedData.bind(this);
    this.signout = this.signout.bind(this);
    this.userSelected = this.userSelected.bind(this);
    this.socket = socketIOClient(variables.apiUrl);
  }

  signout(e) {
    this.setState({ isUserLoggedIn: false, username: '', users: [] });
  }
  updatedData(e) {
    this.setState({ isUserLoggedIn: true, username: e.username, users: e.users, selectedUser: e.users[0] });
  }
  userSelected (event){
    this.setState({ selectedUser: event });
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return (
        <div>
          <Header username={this.state.username} signout={this.signout} />
          <Grid fluid={true} className="zero-padding">
            <Row>
              <Col md={2} lg={2} className="border-right">
                <Chats userSelected={this.userSelected} users={this.state.users}/>
              </Col>
              <Col md={10} lg={10} className="font-sizing">
                <Messages username={this.state.username} selectedUser={this.state.selectedUser} socket={this.socket}/>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <SignLogModal updatedData={this.updatedData} />
      );
    }
  }
}

export default App;
