import React from 'react';
import 'App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import { Alert } from 'reactstrap';

import {
  Navbar, NavbarBrand, Button, NavbarText, NavLink, Collapse, Nav, NavbarToggler, 
} from 'reactstrap';

class Landing extends React.Component {
	constructor(props){  
		super(props);  
		this.state = {
		  navBarOpen: false
		}
	}

	logout = () => {
        localStorage.clear(); // clearing the local storage
        window.location.href = "/"; // refreshing the page with the new local storage
    }

    toggleNavBar = () => {
    	this.setState({navBarOpen: !this.state.navBarOpen})
    }

	render() {
		return (
			<Navbar color="light" light expand="md">
	            <NavbarBrand>Notes</NavbarBrand>
	            <NavbarToggler onClick={this.toggleNavBar} />
	            <Collapse isOpen={this.state.navBarOpen} navbar>
		            <Nav className="mr-auto" navbar>
			            <NavLink href="/">Home</NavLink>
		        	</Nav>
		        	{this.props.isLoggedIn ? (<Button onClick={this.logout}>Logout</Button>) : (null)}
		        	
	        	</Collapse>
	      	</Navbar>
		);
	}
}

export default Landing;
