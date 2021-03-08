import React from 'react';
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

const LoginNavbar = props => {
  return (
    <Navbar className="topnav navbar-absolute fixed-top navbar-transparent" style={{border: 0}}>
      <Container>
        <div className="navbar-wrapper">
          <NavbarBrand style={{color: 'black', fontSize: 20}}>
            Beauty Center
          </NavbarBrand>
        </div>
      </Container>
    </Navbar>
  )
}

export default LoginNavbar;