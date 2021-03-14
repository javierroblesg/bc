/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import {Row, Col, Button, Label, Modal} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

import { connect } from 'react-redux';
import { postNewUser } from './UsersFunctions';
import { fetchUserTypes } from '../UserTypes/UserTypeFunctions';
const mapStateToProps = state => {
  return {
    userTypes: state.userTypes
  }
}
const mapDispatchToProps = (dispatch) => ({
  postNewUser: (newUser) => dispatch(postNewUser(newUser)),
  fetchUserTypes: () => dispatch(fetchUserTypes())
})

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const minNumber = (len) => (val) => (val) && (val > 0);
const isnotNumber = (val) => /^([^0-9]*)$/i.test(val);

const AddUser = props => {
  const handleAddUser = (values)  => {
    props.toggleIsAddUser();
    props.postNewUser(values);
  }
  useEffect(() => {
    if (!props.userTypes.loaded && !props.userTypes.isLoading) {
      props.fetchUserTypes();
    }
  }, [props])
  return (
    <Modal isOpen={props.isAddUser} size="lg" toggle={() => {props.toggleIsAddUser()}} >
      <div className="modal-header">
        <h4>Agregar nuevo usuario</h4>
        <button aria-label="Close" className="close" data-dismiss="modal" onClick={() => props.toggleIsAddUser()}>
          <i className="fa fa-times" style={{fontSize: 18}}/>
        </button>
      </div>
      <LocalForm onSubmit={(values) => handleAddUser(values)} >
        <div className="modal-body">
          <Row className="form-group">
            <Col sm="4">
              <Label htmlFor="firstname" className="form-control-label">Nombre</Label>
              <Control.text model=".firstname" id="firstname" name="firstname" className="form-control"
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                validators={{minLength: minLength(1), maxLength: maxLength(15), isnotNumber}} />
              <Errors className="invalid-feedback" model=".firstname" show="touched"
                messages={{
                  minLength: 'Al menos una letra',
                  maxLength: 'Menos de 16 letras',
                  isnotNumber: 'No puede tener números'
                }} />
            </Col>
            <Col sm="4">
              <Label htmlFor="lastname" className="form-control-label">Apellido</Label>
              <Control.text model=".lastname" id="lastname" name="lastname" className="form-control"
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                validators={{minLength: minLength(1), maxLength: maxLength(15), isnotNumber}} />
              <Errors className="invalid-feedback" model=".lastname" show="touched"
                messages={{
                  minLength: 'Al menos una letra',
                  maxLength: 'Menos de 16 letras',
                  isnotNumber: 'No puede tener números'
                }} />
            </Col>
            <Col sm="4">
              <Label htmlFor="user_type" className="form-control-label">Tipo de Usuario</Label>
              <Control.select model=".user_type" id="user_type" name="user_type" className="form-control"
                validators={{minNumber: minNumber(1)}} defaultValue={'DEFAULT'}>
                  <option value="DEFAULT">Seleccionar</option>
                  {props.userTypes.userTypes.map(userType => {
                    return(<option key={userType.id} value={userType.id}>{userType.name}</option>)
                  })}
              </Control.select>
              <Errors className="invalid-feedback" model=".user_type" show="touched"
                messages={{
                  minLength: 'Seleccionar tipo de usuario'
              }} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col sm="6">
              <Label htmlFor="username" className="form-control-label">Username</Label>
              <Control.text model=".username" id="username" name="username" className="form-control"
                autoComplete="off" autoCorrect="off" spellCheck="false"
                validators={{minLength: minLength(1), maxLength: maxLength(15)}} />
              <Errors className="invalid-feedback" model=".username" show="touched"
                messages={{
                  minLength: 'Al menos una letra',
                  maxLength: 'Menos de 16 letras'
                }} />
            </Col>
            <Col sm="6">
              <Label htmlFor="password" className="form-control-label">Contraseña</Label>
              <Control.text model=".password" id="password" name="password" className="form-control" type="password"
                autoComplete="off" autoCorrect="off" spellCheck="false"
                validators={{minLength: minLength(1), maxLength: maxLength(15)}} />
              <Errors className="invalid-feedback" model=".password" show="touched"
                messages={{
                  minLength: 'Al menos una letra',
                  maxLength: 'Menos de 16 letras',
                }} />
            </Col>
          </Row>
        </div>
        <div className="modal-footer" style={{justifyContent: 'center'}}>
            <Button className="btn btn-warning white" onClick={() => props.toggleIsAddUser()}>Cancelar</Button>
            <Button type="submit" className="btn btn-success white">Agregar Usuario</Button>
        </div>
      </LocalForm>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);