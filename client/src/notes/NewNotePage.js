import React from 'react';
import 'App.css';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import config from "config";
import Editor from "globals/Editor";
import Alert from "globals/Alert";

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
      redirect: null,
      alerts: []
    }
  }

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.redirect}`} />
    }
  }

  notify = (color, msg) => {
    let self = this;
    this.state.alerts.push({color, msg});
    this.setState({refresh: !this.state.refresh});
    window.setTimeout(() => {self.state.alerts.splice(0, 1); self.setState({refresh: !this.state.refresh})}, 3000);
  }

  submit = () => {
    if(!this.state.title) {
      return this.notify("danger", "Title must not be empty");
    }

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
          <Button color="success" onClick={this.submit}>Submit</Button>
        </Card>
        <Alert
          alerts={this.state.alerts}
        /><br/><br/>
      </Container>
    );
  }
}

export default NewNote;
