import React, { useState, useEffect } from 'react';
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardTitle, Button, CardBody } from 'reactstrap';

import View from './UserDetail/View';
import Edit from './UserDetail/Edit';
import Modules from './UserDetail/Modules';
import Services from './UserDetail/Services';

import { connect } from 'react-redux';
import { fetchSingleUser, updateUser, updateUserModules } from './UsersFunctions';
import { fetchUserTypes } from '../UserTypes/UserTypeFunctions';
const mapStateToProps = state => {
  return {
    auth: state.auth,
    singleUser: state.singleUser,
    flashMessage: state.flashMessage,
    userTypes: state.userTypes
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchSingleUser: (userID) => dispatch(fetchSingleUser(userID)),
  updateUserModules: (userId, modules) => dispatch(updateUserModules(userId, modules)),
  updateUser: (userId, userInfo) => dispatch(updateUser(userId, userInfo)),
  fetchUserTypes: () => dispatch(fetchUserTypes())
})

const UserDetail = props => {

  const handleModuleChange = (module, value) => {
    props.singleUser.user.modules[module] = parseInt(value);
    props.updateUserModules(props.match.params.userId, props.singleUser.user.modules);
  }

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((prev => !prev));
  }
  const handleEditUser = values => {
    toggleEditMode();
    props.updateUser(props.match.params.userId, values);
  }

  const [redirect, setRedirect] = useState(false)
  const [alert, setAlert] = useState(null)
  useEffect(() => {
    props.fetchSingleUser(props.match.params.userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.userId])
  useEffect(() => {
    if (!props.userTypes.loaded && !props.userTypes.isLoading) {
      props.fetchUserTypes();
    }
    if (props.flashMessage.message && props.flashMessage.category === 'fetching') {
      setAlert(
        <ReactBSAlert danger
          title="Error en este usuario"
          confirmBtnText="Entiendo"
          onConfirm={() => {setAlert(true); setRedirect(true);}}
          confirmBtnBsStyle="default"
        >
          {props.flashMessage.message}
        </ReactBSAlert>
      );
    }
  }, [props])

  return (
    <>
      {redirect ? <Redirect to="/users" /> : null}
      {alert}
      <Row>
        <Col md="12">
          <p>
            <Link to="/home"><span className="text-muted">Inicio</span></Link>
            <span className="text-muted"> &gt;</span>{" "}
            <Link to="/users" style={{fontSize: 14}}>Usuarios</Link>
            <span className="text-muted"> &gt;</span>{" "}
            <span className="text-muted" style={{display: 'inline', fontSize: 14}}>{props.match.params.userId}</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Card>
            {props.singleUser.isLoading ?
              <div className="text-center" style={{padding: 20}}>
                <div className="spinner-grow text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> 
            :
              <>
                <CardHeader>
                  <CardTitle style={{float: 'left'}} tag="h4">
                    Información del Usuario
                  </CardTitle>
                  {editMode ? null :
                    <Button style={{float: 'right'}} className="btn btn-success" size="sm" onClick={() => toggleEditMode()}>
                      <i className="fa fa-edit"></i>
                    </Button>
                  }
                </CardHeader>
                <CardBody style={{paddingTop: 10}}>
                  {editMode ?
                    <Edit {...props} handleEditUser={handleEditUser} toggleEditMode={toggleEditMode}/>
                    :
                    <View {...props}/>
                  }
                </CardBody>
              </>
            }
            <Services {...props}/>
          </Card>
        </Col>
        <Col md="4">
          <Modules {...props} handleModuleChange={handleModuleChange}/>
        </Col> 
      </Row>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);