import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import config from "./config";

import {
  Container, Col, Form, Row,
  FormGroup, Label, Input,
  Button, Modal, Alert
} from 'reactstrap';

class Notes extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      notes: [],
      render: false
    }
    this.getNotes();
  }

  getNotes = () => {
    axios.get(`${config.backEndServer}/notes/?token=${ JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}`)
      .then((res) => {
       return this.setState({render: true, notes: res.data.notes});
      })
      .catch(e => {
         this.setState({render: true}); //TODO Alert message
      })
  }

  renderNotes = () => {
    return (
      <Row>
        {this.state.notes.map((item, key) => <div> Note</div>)}
      </Row>
    )
  }

  renderAdder = () => {
    return (
      <Button href="/notes/add">
        Add Note
      </Button>
    )
  }

  renderWelcome = () => {
    console.log(this.props.location)
    if(this.props.location.query.welcome) {
      return (
        <Alert color="primary">Welcome to Notes, You have successfully activated your account</Alert>
      )
    }
    return null;
  }

  render() {
    if(!this.state.render) {
      return (
        <div>loading</div>
      )
    }
    return (
      <Container className="App">
        {this.renderWelcome()}
        {this.renderNotes()}
        {this.renderAdder()}
      </Container>
    );
  }
}

export default Notes;
