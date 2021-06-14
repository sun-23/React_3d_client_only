import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { AuthProvider } from './context/AuthContext'
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Preview from './Page/Preview'
import Register from './Page/Register'
import Home from './Page/Home'
import Login from './Page/Login'

function App() {
  return (
    <Container className="container">
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/instantqoutation" component={Preview}/>
              <Route path="/signup" component={Register}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
