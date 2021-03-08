import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

import { connect } from 'react-redux';
import { loginUser } from './LoginFunctions.js';
const mapStateToProps = state => {
  return {
    auth : state.auth
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
})

const LoginForm = props => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
  const handleLogin = (event) => {
    props.loginUser({username: username.value, password: password.value});
    event.preventDefault();
  }
  localStorage.clear();
  return (
    <div className="login-card">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form onSubmit={handleLogin} className="form">
              <Card className="card-white">
                <CardHeader>
                  <CardHeader >
                    <h3>Iniciar Sesión</h3>
                  </CardHeader>
                </CardHeader>
                <CardBody style={{paddingBottom: 0}}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user-o" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="login-input"
                      autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                      placeholder="Username"
                      id = "username"
                      name="username"
                      type="text"
                      innerRef={input => setUsername(input)}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText >
                        <i className="fa fa-key" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="login-input"
                      autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                      placeholder="Password"
                      id = "password"
                      name="password"
                      type="password"
                      innerRef={input => setPassword(input)}/>
                  </InputGroup>
                </CardBody>
                <CardFooter>
                  {props.auth.errorMessage ? 
                  <p className="text-danger" style={{textAlign: 'center'}}>{props.auth.errorMessage}</p> :
                  null}
                  {props.auth.isLoading ? 
                  <p className="text-warning" style={{textAlign: 'center'}}>Loading ...</p> :
                  null}
                  <Button block className="btn-round mb-3" color="primary" type="submit" value="submit" >
                    Log In
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="full-page-background"
        style={{
          backgroundColor: '#175CBC',
        }}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);