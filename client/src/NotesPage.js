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
    return (<div></div>);
  }
}

export default Notes;
