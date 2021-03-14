/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {Row, Col, Button, Label, Modal} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

import { connect } from 'react-redux';
import { postNewUserType } from './UserTypeFunctions';
const mapStateToProps = state => {
  return {
    userTypes: state.userTypes
  }
}
const mapDispatchToProps = (dispatch) => ({
  postNewUserType: (newUserType) => dispatch(postNewUserType(newUserType))
})

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isnotNumber = (val) => /^([^0-9]*)$/i.test(val);

const AddUserType = props => {
  const handleAddUserType = (values)  => {
    props.toggleIsAddUserType();
    props.postNewUserType(values);
  }
  return (
    <Modal isOpen={props.isAddUserType} size="lg" toggle={() => {props.toggleIsAddUserType()}} >
      <div className="modal-header">
        <h4>Agregar nuevo tipo de usuario</h4>
        <button aria-label="Close" className="close" data-dismiss="modal" onClick={() => props.toggleIsAddUserType()}>
          <i className="fa fa-times" style={{fontSize: 18}}/>
        </button>
      </div>
      <LocalForm onSubmit={(values) => handleAddUserType(values)} >
        <div className="modal-body">
          <Row className="form-group">
            <Col>
              <Label htmlFor="name" className="form-control-label">Nombre</Label>
              <Control.text model=".name" id="name" name="name" className="form-control"
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                validators={{minLength: minLength(1), maxLength: maxLength(15), isnotNumber}} />
              <Errors className="invalid-feedback" model=".name" show="touched"
                messages={{
                  minLength: 'Al menos una letra',
                  maxLength: 'Menos de 16 letras',
                  isnotNumber: 'No puede tener números'
                }} />
            </Col>
          </Row>
        </div>
        <div className="modal-footer" style={{justifyContent: 'center'}}>
            <Button className="btn btn-warning white" onClick={() => props.toggleIsAddUserType()}>Cancelar</Button>
            <Button type="submit" className="btn btn-success white">Agregar</Button>
        </div>
      </LocalForm>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserType);