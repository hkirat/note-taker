import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Modal
} from 'reactstrap';

class Notes extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      isLoggedIn: false,
      render: false
    }
    this.verifyCreds();
  }

  render() {
    return (
      <Container className="App">
         <Modal isOpen={this.props.modalOpen}>
          <h2>Sign In</h2>
           <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
          </Form>
        </Modal>
      </Container>
    );
  }
}

export default Notes;
