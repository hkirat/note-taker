import notesRoutes from "routes/notesRoutes"
import React from 'react';
import 'App.css';
import axios from "axios";
import config from "config";
import classnames from 'classnames';
import { UncontrolledAlert } from 'reactstrap';
import Alert from 'globals/Alert';
import {
  Container, Col, Form,
  FormGroup, Label, Input, Modal, 
  TabContent, TabPane, Nav, NavItem, NavLink, 
  Card, Button, CardTitle, CardText, Row, Spinner
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
			alerts: [],
			spinner: false
		}
	}

	notify = (color, msg) => {
	    let self = this;
	    this.state.alerts.push({color, msg});
	    this.setState({refresh: !this.state.refresh});
	    window.setTimeout(() => {self.state.alerts.splice(0, 1); self.setState({refresh: !this.state.refresh})}, 3000);
  	}
	
	toggle = (tab) => {
		if(this.state.activeTab !== tab) this.setState({activeTab: tab});
	}

	signIn = () => {
		let self = this;
		this.setState({spinner: true})
	    axios.post(`${config.backEndServer}/user/signIn`, {
	    	username: this.state.email,
	    	password: this.state.password
	    })
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	localStorage.setItem('user', JSON.stringify({
                token: res.data.token
            }))
			this.setState({spinner: false})
	      	window.location.href = "/"; 
	      }
      	  this.notify("primary", "Signing in");
	    })
	    .catch(e => {
	    	this.setState({spinner: false})
	      	if(e.response && e.response.data) 
	      		return this.notify("danger", e.response.data.msg || "Error while Signing in");
      		this.notify("danger", "Error while Signing in");
	    })
	}

	signUp = () => {
		let self = this;
		this.setState({spinner: true})
	    axios.post(`${config.backEndServer}/user/signUp`, {
	    	username: this.state.email,
	    	password: this.state.password,
	    	first_name: this.state.first_name,
	    	last_name: this.state.last_name
	    })
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	      	this.notify("primary", "Verification Mail Sent, Please check your mail");
			this.setState({spinner: false});
	      }
	    })
	    .catch((e) => {
	    	this.setState({spinner: false});
	    	if(e.response && e.response.data)
	      		return this.notify("danger", e.response.data.msg || "Error while Signing up");
      		this.notify("danger", "Error while Signing up");
	    })
	}

	getHeader = () => {
		return this.state.activeTab == 2 ? "Sign up" : "Sign in";
	}

	render() {
		let self = this;
		return (
			  <Container>
			    <Modal className="Login" isOpen={this.props.modalOpen}>
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
			          <Label for="examplePassword">Password (atleast 6 letters)</Label>
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
					        <center>
					        <Button color="primary" onClick={self.signUp}>Sign Up</Button>
					        {this.state.spinner ? (<Spinner />) : (null)}
					        </center>
					    </div>
		        	) : (
		        		<div>
			        		<center>
			          			<Button color="primary" onClick={self.signIn}>Sign In</Button>
			          			{this.state.spinner ? (<Spinner />) : (null)}
		          			</center>
		          		</div>
		          	)}
			      </Form>
			    </Modal>
			    <Alert
		          alerts={this.state.alerts}
		        />
			  </Container>
		);
	}
}

export default Landing;
