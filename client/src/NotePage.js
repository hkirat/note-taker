import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Modal
} from 'reactstrap';

class Note extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      render: false,
      slug: props.match.params.slug
    }
    this.getNote()
  }

  getNote = () => {
    axios.get(`${config.backEndServer}/notes?token=?token=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}`, {
        slug: this.state.slug
    })
    .then((res) => {
      this.setState({render: true, description: res.data.note.description, title: res.data.note.title});
    })
    .catch(e => {
      alert(e);
      self.notify("Failed to get note"); // TODO: alert better
    })
  }

  render() {
    if(!this.state.render) {
      <div>loading</div>
    }
    return (
      <Container>
        <Card body>
          <Input type="text" value={this.state.title} name="title" placeholder="Title" onChange={(e) => this.setState({title: e.target.value})}/>
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

export default Note;
