import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NotesTopper from './NotesTopper';
import ActivatePage from './ActivatePage';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Router>
    <div>
      <Route path="/" component={NotesTopper} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
