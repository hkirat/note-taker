import React from 'react';

import {
	Spinner
} from 'reactstrap';

class Notes extends React.Component {
  constructor(props){  
    super(props);
  }

  render() {
    return (
        <div style={{marginTop: "42vh"}}>
          <center>
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
          </center>
        </div>
    )
  }
}

export default Notes;
