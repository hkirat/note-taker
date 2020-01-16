import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import config from "./config";

import {
  Alert, Container
} from 'reactstrap';

class Notes extends React.Component {
  constructor(props){  
    super(props);  
  }
  
  getAlerts = () => {
    return (
      <div>
        {this.props.alerts.map((item, key) => <Alert color={item.color} key={key}>{item.msg}</Alert>)}
        </div>
    )
  }

  render() {
    return (
      <Container className="Fixed">
          {this.getAlerts()}
      </Container>
    );
  }
}

export default Notes;
