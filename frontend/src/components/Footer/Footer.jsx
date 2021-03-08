import React from 'react';
import { Container, Row } from "reactstrap";

const Footer = props => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <a target="_blank" rel="noreferrer" href="https://kodease.com">Kodease</a>
          <a target="_blank" rel="noreferrer" href="https://beautycenter.com">Beauty Center</a>
          <div className="credits ml-auto">
            <span className="copyright"> 
              Pre Release 0.01
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;