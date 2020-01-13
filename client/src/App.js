import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class Landing extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      isLoggedIn: false,
      render: false
    }
  }

  renderRedirect = () => {
    if (this.state.isLoggedIn) {
      return <Redirect to='/notes' />
    }
  }

  render() {
    return (
      <Container className="App">
         <h2>Sign In</h2>
         <Modal isOpen={props.modalOpen} className={className}>
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

export default Landing;
