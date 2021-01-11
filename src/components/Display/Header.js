import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#/transactions">Plaid</Nav.Link> */}
    <NavDropdown title= 'Budget' id='budget-dropwdown'>
      <NavDropdown.Item href='#/budgets'>Create new</NavDropdown.Item>
      <NavDropdown.Item href='#/view-budgets'>View all</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title= 'Settings' id='settings-dropdown'>
      <NavDropdown.Item href='#/change-password'>Change Password</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className='navColor' variant='light' expand="md">
    <Navbar.Brand href="#">
      capstone
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Signed in as: {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
