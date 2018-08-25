import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import './SignLogModal.css'
import Axios from 'axios';
import { variables } from './../../variables';

class SignLogModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            security: '',
            signup: false,
            message: ''
        }
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.securityChanged = this.securityChanged.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
        this.signup = this.signup.bind(this);
    }
    usernameChanged(e) {
        this.setState({ username: e.target.value });
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value });
    }
    emailChanged(e) {
        this.setState({ email: e.target.value });
    }
    securityChanged(e) {
        this.setState({ security: e.target.value });
    }
    submitClicked(e) {
        let request = {};
        if (this.state.signup) {
            request = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                security: this.state.security,
                online: false,
                signup: this.state.signup,
                socket: this.props.socket.id
            }
        } else {
            request = {
                username: this.state.username,
                password: this.state.password,
                signup: this.state.signup,
                socket: this.props.socket.id
            }
        }
        const self = this;
        if ((request.username.length && request.password.length && !request.signup) ||
            (request.signup && request.username.length && request.password.length && request.security.length && request.email.length)) {
            Axios.post(variables.apiUrl + 'users', request).then(function (response) {
                if (response.data.status === 'SUCCESS') {
                    variables.isUserLoggedIn = true;
                    variables.allUsers = response.data.value;
                    const value = {
                        'username': self.state.username,
                        'users': response.data.value
                    }
                    if (!request.signup) {
                        self.props.updatedData(value);
                    } else {
                        self.setState({ signup: false, message: 'Login to continue.' })
                    }
                } else {
                    if (response.data.message) {
                        self.setState({ message: response.data.message });
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            this.setState({ message: 'Please fill correct information' });
        }
    }
    signup(e) {
        this.setState({ signup: !this.state.signup });
    }
    render() {
        return (
            <Modal show={true} animation={false}>
                <Modal.Header><Modal.Title>{this.state.signup ? 'Register ' : 'Identify '}Yourself</Modal.Title></Modal.Header>
                <Modal.Body>
                    {
                        this.state.message.length ? <span className="error-color">{this.state.message}</span> : null
                    }
                    <FormGroup>
                        {
                            this.state.signup ?
                                <FormControl type="text" value={this.state.email} onChange={this.emailChanged} placeholder="Enter email" className="margin-top-2" />
                                : null
                        }
                        <FormControl type="text" value={this.state.username} onChange={this.usernameChanged} placeholder="Enter username" className="margin-top-2" />
                        {
                            this.state.signup ?
                                <FormControl type="text" value={this.state.security} onChange={this.securityChanged} placeholder="Security Question: Which is your favourite car?" className="margin-top-2" />
                                : null
                        }
                        <FormControl type="password" value={this.state.password} onChange={this.passwordChanged} placeholder="Enter password" className="margin-top-2" />

                    </FormGroup>
                    <Button type="submit" bsStyle="success" onClick={this.submitClicked}>Submit</Button>
                    <Button bsStyle="link" onClick={this.signup}>{!this.state.signup ? 'Sign Up' : 'Log In'}</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SignLogModal;