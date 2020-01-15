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

class Notes extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      isLoggedIn: false,
      render: false
    }
    this.getNotes();
  }

  getNotes = () => {
    axios.get(`${config.backEndServer}/notes/gated?token=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}`, {
    })
    .then((res) => {
      this.setState({render: true, notes: res.data.notes});
    })
    .catch(e => {
      alert(e);
    })
  }

  render() {
    return (<div></div>);
  }
}

export default Notes;
