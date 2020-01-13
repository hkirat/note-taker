import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Notes from './NotesTopper';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
const routing = (
  <Router>
    <div>
      <Route exact path="/notes" component={Notes} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
