import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import config from "./config";
import Editor from "./Editor";

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Modal, Card, CardText
} from 'reactstrap';

class NewNote extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      title: "",
      note: {},
      editor: null,
      redirect: null
    }
  }

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.redirect}`} />
    }
  }

  submit = () => {
    this.state.editor.save()
      .then((note) => { 
        return axios.post(`${config.backEndServer}/notes/`, {
          token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
          title: this.state.title,
          note
        })
      })
      .then((res) => {
        this.setState({redirect: res.data.note.slug});
      })
      .catch(e => {
        //TODO: Alert
      })
  }

  render() {
    return (
      <Container>
        {this.redirect()}
        <Card body>
          <Input type="text" name="title" placeholder="Title" onChange={(e) => this.setState({title: e.target.value})}/>
          <CardText>
            <Editor
              value={this.state.description}
              setEditor={(editor) => this.setState({editor})}
            />
          </CardText>
          <Button onClick={this.submit}>Submit</Button>
        </Card>
      </Container>
    );
  }
}

export default NewNote;
