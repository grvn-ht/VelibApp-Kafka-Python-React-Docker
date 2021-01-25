import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App'
import {ExampleE, ExampleM} from './QrCode'

class RR extends Component {
    render() {
      return (
        <Router>
          <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/qrcodeE' component={ExampleE} />
                <Route path='/qrcodeM' component={ExampleM} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default RR;