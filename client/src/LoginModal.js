import notesRoutes from "./routes/notesRoutes"

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import config from "./config";

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Modal
} from 'reactstrap';

class Landing extends React.Component {
	constructor(props){  
		super(props);
	}

	signIn = () => {
		let self = this;
	    axios.post(`${config.backEndServer}/user/signIn`, {})
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	this.props.setUser(res.data.user);
	      }
	      //alert a notification
	    })
	    .catch(e => {
	    	//alert a notification
	    })
	}

	signUp = () => {
		let self = this;
	    axios.post(`${config.backEndServer}/user/signUp`, {})
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	// verification mail alert
	      }
	      //alert a notification
	    })
	    .catch(e => {
	    	//alert a notification
	    })
	}

	render() {
		let self = this;
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
			        <Button color="primary" onClick={self.signIn}>Sign In</Button>{' '}
			        <Button color="primary" onClick={self.signUp}>Sign Up</Button>{' '}
			      
			    </Modal>
			  </Container>
		);
	}
}

export default Landing;
