import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "./Editor"
import Alert from "./Alert";
import axios from "axios";
import config from "./config";
import Loader from "./Loader";

import {
  Container, Col, Form, Card, CardText,
  FormGroup, Label, Input,
  Button, Modal, Row, Table, InputGroup,
  InputGroupAddon, InputGroupText
} from 'reactstrap';

class Note extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      render: false,
      slug: props.match.params.note_id,
      access: true,
      requests: [],
      alerts: []
    }
    this.getNote()
  }

  getNote = () => {
    axios.get(`${config.backEndServer}/notes?token=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}&slug=${this.state.slug}`)
      .then((res) => {
        this.setState({render: true, description: res.data.note.description, title: res.data.note.title, requests: res.data.note.requests});
      })
      .catch(e => {
        this.setState({render: true, access: false})
      })
  }

  requestAccess = () => {
    axios.post(`${config.backEndServer}/notes/request`, {
      token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
      slug: this.state.slug
    })
    .then((res) => {
      this.notify("primary", "Request Sent, Please follow up with an admin to get it approved");
    })
    .catch(e => {
      this.notify("danger", "Error while Sending request to admin");
    })
  }

  notify = (color, msg) => {
    let self = this;
    this.state.alerts.push({color, msg});
    this.setState({refresh: !this.state.refresh});
    window.setTimeout(() => {self.state.alerts.splice(0, 1); self.setState({refresh: !this.state.refresh})}, 3000);
  }

  update = () => {
    this.state.editor.save()
      .then((note) => { 
        return axios.put(`${config.backEndServer}/notes/`, {
          token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
          title: this.state.title,
          note,
          slug: this.state.slug
        })
      })
      .then((res) => {
        this.notify("primary", "Note Updated");
      })
      .catch(e => {
        this.notify("error", "Error while Updating Note");
      })
  }

  approve = (email) => {
    axios.put(`${config.backEndServer}/notes/approve`, {
      token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
      slug: this.state.slug, 
      email
    })
    .then((res) => {
      let index = this.state.requests.map((req) => req.email).indexOf(email);
      this.state.requests.splice(index, 1);
      this.setState({refresh: this.state.refresh});
      this.notify("primary", `Approved Request for ${email}`);
    })
    .catch(e => {
      this.notify("danger", `Approval Request Failed for ${email}, User Doesn't exist`);
    })
  }

  renderRequests = () => {
    if(!this.state.requests || !this.state.requests.length) {
      return (<div> There are no access requests for this note </div>)
    }
    let self = this;
    return (
      <Table>
        <tbody>
          {this.state.requests.map((req, key) => {
            return (
              <tr>
                <th>{req.email}</th>
                <th><Button color="success" onClick={() => self.approve(req.email)}>Approve</Button>{' '}</th>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  render() {
    if(!this.state.render) {
      return <Loader/>
    }
    if(!this.state.access) {
      return (
        <Container style={{marginTop: "30vh"}}>
          <center>
            <Alert
              alerts={this.state.alerts}
            />
            <h1> You don't have access to this note </h1><br/>
            <Button color="primary" onClick={this.requestAccess}>
              Request Access
            </Button>
          </center>
        </Container>
      )
    }
    return (
      <Container>
        <Alert
          alerts={this.state.alerts}
        />
        <Row>
          <Col sm="8">
            <Card body>
              <Input type="text" value={this.state.title} name="title" placeholder="Title" onChange={(e) => this.setState({title: e.target.value})}/>
              <CardText>
                <Editor
                  value={this.state.description}
                  setEditor={(editor) => this.setState({editor})}
                />
              </CardText>
              <Button onClick={this.update}>Update</Button>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              Requests
              {this.renderRequests()}
            </Card>
            <br/><br/>
            <Card body>
              <InputGroup>
                <Input placeholder="Email" onChange={(e) => this.setState({requestEmail: e.target.value})} />
                <Button onClick={() => this.approve(this.state.requestEmail)}>
                  Give Access
                </Button>
              </InputGroup>
            </Card>
            <br/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Note;
