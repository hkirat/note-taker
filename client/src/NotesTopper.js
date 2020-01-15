import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginModal from './LoginModal';
import Notes from "./Notes";
import notesRoutes from "./routes/notesRoutes"
import axios from "axios";
import config from "./config";

const switchRoutes = (
  <Switch>
    {notesRoutes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
);

class Landing extends React.Component {
	constructor(props){  
		super(props);  
		this.state = {
		  isLoggedIn: false,
		  render: false
		}
		this.getLoggedIn();
	}

	setUser = (user) => {
		this.setState({user, isLoggedIn: true})
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
			return (
			<div>loading</div>
			)
		}
		return (
			<div>
				<LoginModal
					modalOpen={!this.state.isLoggedIn}
					setUser={this.setUser}
				/>
				<div>
					{switchRoutes}
				</div>
			</div>
		);
	}
}

export default Landing;
