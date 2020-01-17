import React from 'react';
import 'App.css';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import config from "config";
import EditorJS from '@editorjs/editorjs';

import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Modal, Card, CardBody
} from 'reactstrap';


const CodeTool = require('@editorjs/code');
const Embed = require('@editorjs/embed');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props.setEditor(new EditorJS({
      holderId: 'codex-editor', data: this.props.value, minHeight: "200" ,
      tools: { header: Header, list: List, embed: Embed, code: CodeTool, image: SimpleImage }
    }));
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div id='codex-editor'></div>
        </CardBody>
      </Card>
    );
  }
}

export default Editor;
