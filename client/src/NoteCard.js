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
        <CardImg src="https://reactstrap.github.io/assets/318x180.svg" alt="Note" />
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
            {this.props.hasAccess ? (
              <Button color="primary" href={`/notes/${this.props.slug}`}>
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
