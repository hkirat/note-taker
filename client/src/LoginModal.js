import notesRoutes from "./routes/notesRoutes"

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import config from "./config";
import classnames from 'classnames';
import { UncontrolledAlert } from 'reactstrap';
import { Alert } from 'reactstrap';

import {
  Container, Col, Form,
  FormGroup, Label, Input, Modal, 
  TabContent, TabPane, Nav, NavItem, NavLink, 
  Card, Button, CardTitle, CardText, Row
} from 'reactstrap';

class Landing extends React.Component {
	constructor(props){  
		super(props);
		this.state = {
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			activeTab: 1,
			notifications: []
		}
	}
	notify = (msg) => {
		let self = this;
		this.state.notifications.push(msg);
		this.setState({refresh: !this.state.refresh});
		window.setTimeout(() => self.state.notifications.splice(0, 1), 3000);
	}

	toggle = (tab) => {
		if(this.state.activeTab !== tab) this.setState({activeTab: tab});
	}

	signIn = () => {
		let self = this;
	    axios.post(`${config.backEndServer}/user/signIn`, {
	    	username: this.state.email,
	    	password: this.state.password
	    })
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	this.props.setUser(res.data.user);
	      }
      	  this.notify(res.data.msg);
	    })
	    .catch(e => {
	    	alert(e);
	    	self.notify("Failed to Login");
	    })
	}

	signUp = () => {
		let self = this;
	    axios.post(`${config.backEndServer}/user/signUp`, {
	    	username: this.state.email,
	    	password: this.state.password,
	    	first_name: this.state.first_name,
	    	last_name: this.state.last_name
	    })
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	alert("Verification mail sent");
	      }
	      //alert a notification
	    })
	    .catch(e => {
	    	//alert a notification
	    })
	}

	getHeader = () => {
		return this.state.activeTab == 2 ? "Sign up" : "Sign in";
	}

	getAlerts = () => {
		return (
			<div>
				{this.state.notifications.map((item, key) => <Alert color="primary" key={key}>{item}</Alert>)}
		    </div>
		)
	}

	render() {
		let self = this;
		return (
			  <Container className="App">
			     <Modal isOpen={this.props.modalOpen}>
			     {this.getAlerts()}
			      <Nav tabs>
			        <NavItem>
			          <NavLink
			            className={classnames({ active: this.state.activeTab === 1 })}
			            onClick={() => { this.toggle(1); }}
			          >
			            Signin
			          </NavLink>
			        </NavItem>
			        <NavItem>
			          <NavLink
			            className={classnames({ active: this.state.activeTab === 2 })}
			            onClick={() => { this.toggle(2); }}
			          >
			            Signup
			          </NavLink>
			        </NavItem>
			        </Nav>
			       <h2>{this.getHeader()}</h2>
			       <Form>
			        <FormGroup>
			          <Label for="exampleEmail">Email</Label>
			          <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
			        </FormGroup>
			        <FormGroup>
			          <Label for="examplePassword">Password</Label>
			          <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
			        </FormGroup>
			        {this.state.activeTab == 2 ? (
			        	<div>
	 						<FormGroup>
					          <Label for="examplePassword">First Name</Label>
					          <Input type="text" name="First Name" id="exampleFirstName" placeholder="First Name" onChange={(e) => this.setState({first_name: e.target.value})}/>
					        </FormGroup>
					         <FormGroup>
					          <Label for="examplePassword">Last Name</Label>
					          <Input type="text" name="last_name" id="exampleLastName" placeholder="Last Name" onChange={(e) => this.setState({last_name: e.target.value})}/>
					        </FormGroup>
					    </div>
		        	) : null}
			      </Form>
		          <Button color="primary" onClick={self.signIn}>Sign In</Button>{' '}
		          <Button color="primary" onClick={self.signUp}>Sign Up</Button>{' '}
			    </Modal>
			  </Container>
		);
	}
}

export default Landing;
