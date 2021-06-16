import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Navbar, Nav } from 'react-bootstrap'
import { AuthProvider } from './context/AuthContext'
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './Route/PrivateRoute'

import Preview from './Page/Preview'
import Register from './Page/Register'
import Home from './Page/Home'
import Login from './Page/Login'
import Dashboard from "./Page/Dashboard";
import Contact from './Page/Contact'
import Footer from './Component/Footer'

function App() {
  return (
      <div>
        <Router>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link className="navbar-brand" to="/">3DSun</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link className="nav-link" to="/instantqoutation">Qoute</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/login">Log In</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/instantqoutation" component={Preview}/>
              <Route path="/signup" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/contact" component={Contact}/>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
            </Switch>
          </AuthProvider>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
