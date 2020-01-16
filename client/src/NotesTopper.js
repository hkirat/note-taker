import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginModal from './LoginModal';
import notesRoutes from "./routes/notesRoutes"
import axios from "axios";
import config from "./config";
import { Alert } from 'reactstrap';
import Loader from "./Loader";

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

	render() {
	    if(!this.state.render) {
	    	return <Loader/>
	    }
		return (
			<div>
				<LoginModal
					modalOpen={!this.state.isLoggedIn}
					setUser={this.setUser}
				/>
				{this.renderAlerts()}
				<div>
					{
					  <Switch>
					    {notesRoutes.map((prop, key) => {
					  		return <Route path={prop.path} component={prop.component} key={key} notify={this.notify}/>
					    })}
					  </Switch>
					}
				</div>
			</div>
		);
	}
}

export default Landing;
