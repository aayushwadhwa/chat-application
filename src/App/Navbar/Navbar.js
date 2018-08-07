import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './Navbar.css';
import Axios from 'axios';
import { variables } from './../../variables';

class Header extends Component {
    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }
    signout(e) {
        const self = this;        
        Axios.post(variables.apiUrl + 'signout', {username: this.props.username}).then(function(response) {
            if (response.data.status === 'SUCCESS') {
                self.props.signout('Signout');
            } else {
                console.log(response);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
    render() {
        return (
            <Navbar fixedTop={true} fluid={true} className="navbar-css">
                <Navbar.Header>
                    <Navbar.Brand>
                        <span>Web Chat Application</span>
                    </Navbar.Brand>
                </Navbar.Header>
                    <Navbar.Text>
                        Signed in as: {this.props.username}
                    </Navbar.Text>
                    <Button bsStyle="danger" onClick={this.signout} pullRight>Sign Out</Button>
            </Navbar>
        );
    }
}

export default Header;