import React from 'react';

import {
  Card, CardImg, CardText, CardBody, Col,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class NotesCard extends React.Component {
  constructor(props){  
    super(props);  
  }

  render() {
    return (
      <Card>
        <CardImg src={`/topper${parseInt(Math.random() * 3)}.jpg`} alt="Note" />
        <CardBody className="card">
          <CardTitle>{this.props.title}</CardTitle>
            {this.props.hasAccess ? (
              <Button color="primary" href={`/${this.props.slug}`}>
                Open
              </Button>
            )
            :
            (
              <Button href={`/notes/${this.props.slug}`}>
                Request Access
              </Button>
            )}
        </CardBody>
      </Card>
    );
  }
}

export default NotesCard;
