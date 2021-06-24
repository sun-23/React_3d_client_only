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
              <Navbar.Collapse id="basic-navbar-nav w-100">
                <Nav className="mr-auto w-100">
                  <Nav.Link>
                    <Link className="nav-link" to="/instantqoutation">Instant Qoute</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </Nav.Link>
                </Nav>
                <Nav className="ml-auto w-50 justify-content-end">
                  {currentUser ? (
                    <>
                      <Nav.Link>
                        <Link className="nav-link" to="/dashboard">{currentUser && currentUser.email}</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link className="nav-link" to="/cart">Cart</Link>
                      </Nav.Link>
                      <Nav.Link>
                        {/* <Button variant="secondary" onClick={handleLogout} style={{textDecoration: "none",  color: "lightgray"}}>Log Out</Button> */}
                        <Link className="nav-link" onClick={handleLogout}>Log Out</Link>
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
