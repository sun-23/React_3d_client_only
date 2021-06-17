import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function NavBar() {

    const history = useHistory()

    const { currentUser, logout } = useAuth()

    async function handleLogout() {
        try {
        await logout()
        history.push("/")
        } catch {
        console.log('error');
        }
    }

    return (
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
                  {currentUser ? (
                    <>
                      <Nav.Link className="col">
                      <Link className="nav-link" to="/dashboard">{currentUser && currentUser.email}</Link>
                      </Nav.Link>
                      <Nav.Link className="col">
                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                      </Nav.Link>
                    </>
                  ): (
                    <>
                      <Nav.Link>
                        <Link className="nav-link" to="/login">Log In</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}
