import React from 'react';
import 'App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginModal from 'auth/LoginModal';
import notesRoutes from "routes/notesRoutes"
import axios from "axios";
import config from "config";
import { Alert } from 'reactstrap';
import Loader from "globals/Loader";
import Topbar from "globals/TopBar";

import {
  Navbar, NavbarBrand, Button, NavbarText, NavLink, Collapse, Nav, NavbarToggler, 
} from 'reactstrap';

const routes = (
  <Switch>
  	{notesRoutes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Landing extends React.Component {
	constructor(props){  
		super(props);  
		this.state = {
		  isLoggedIn: false,
		  render: false,
		  notifications: []
		}
		this.getLoggedIn();
	}

	setUser = (user) => {
		this.setState({user, isLoggedIn: true})
	}

	renderAlerts = () => {
		return (
			<div>
				{this.state.notifications.map((item, key) => <Alert color="primary" key={key}>{item}</Alert>)}
		    </div>
		)
	}

	notify = (msg) => {
		let self = this;
		this.state.notifications.push(msg);
		this.setState({refresh: !this.state.refresh});
		window.setTimeout(() => self.state.notifications.splice(0, 1), 3000);
	}
	
	getLoggedIn = () => {
	    let self = this;
	    axios.get(`${config.backEndServer}/user/?token=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}`)
	    .then((res) => {
	      if ((res.status == 200 || res.status == 204 )) {
	         return self.setState({render: true, user: res.data.user, isLoggedIn: true});
	      }
	      return self.setState({render: true})
	    })
	    .catch(e => {
	       self.setState({render: true})
	    })
	}

	logout = () => {
        localStorage.clear(); // clearing the local storage
        window.location.reload();
    }

    isActivationRoute = () => {
    	console.log(this.props.location)
    	return this.props.location.pathname.includes("activate")
    }

	render() {
	    if(!this.state.render) {
	    	return <Loader/>
	    }
		return (
			<div>
			<Topbar
				isLoggedIn={this.state.isLoggedIn}
			/><br/>
			<LoginModal
				modalOpen={!this.state.isLoggedIn && !this.isActivationRoute()}
				setUser={this.setUser}
			/>
			{this.renderAlerts()}
			<div className="CardHolder">
				<div class = "wrapper">
					{routes}
				</div>
			</div>
			</div>
		);
	}
}

export default Landing;
