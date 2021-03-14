/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Col, Button, Label, Input } from 'reactstrap';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isnotNumber = (val) => /^([^0-9]*)$/i.test(val);
const minNumber = (len) => (val) => (val) && (val > 0);

const Edit = props => {
  return (
    <LocalForm onSubmit={(values) => props.handleEditUser(values)} >
      <Row className="form-group">
        <Col md="6">
          <Label htmlFor="firstname" className="form-control-label">Nombre</Label>
          <Control.text model=".firstname" id="firstname" name="firstname" className="form-control"
            defaultValue={props.singleUser.user.firstname} style={{marginBottom: 8}}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            validators={{minLength: minLength(1), maxLength: maxLength(15), isnotNumber}} />
          <Errors className="invalid-feedback" model=".firstname" show="touched"
            messages={{
              minLength: 'Al menos una letra',
              maxLength: 'Menos de 16 letras',
              isnotNumber: 'No puede tener números'
            }} />
        </Col>
        <Col md="6">
          <Label htmlFor="lastname" className="form-control-label">Apeliido</Label>
          <Control.text model=".lastname" id="lastname" name="lastname" className="form-control"
            defaultValue={props.singleUser.user.lastname} style={{marginBottom: 8}}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            validators={{minLength: minLength(1), maxLength: maxLength(15), isnotNumber}} />
          <Errors className="invalid-feedback" model=".lastname" show="touched"
            messages={{
              minLength: 'Al menos una letra',
              maxLength: 'Menos de 16 letras',
              isnotNumber: 'No puede tener números'
            }} />
        </Col>
      <Row className="form-group">
      </Row>
        <Col md="6">
          <Label htmlFor="username" className="form-control-label">Usuario</Label>
          <Control.text model=".username" id="username" name="username" className="form-control"
            defaultValue={props.singleUser.user.username} style={{marginBottom: 8}}
            autoComplete="off" autoCorrect="off" spellCheck="false"
            validators={{minLength: minLength(1), maxLength: maxLength(15)}} />
          <Errors className="invalid-feedback" model=".username" show="touched"
            messages={{
              minLength: 'Al menos una letra',
              maxLength: 'Menos de 16 letras'
            }} />
        </Col>
        <Col sm="6">
          <Label htmlFor="user_type" className="form-control-label">Tipo de Usuario</Label>
          <Control.select model=".user_type" id="user_type" name="user_type" className="form-control"
            validators={{minNumber: minNumber(1)}} defaultValue={props.singleUser.user.UserType.id}>
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
      <div style={{textAlign: 'center'}}>
        <Button className="tb btn btn-warning white" onClick={() => props.toggleEditMode()}>Cancelar</Button>
        <Button type="submit" className="btn btn-success" color="success">Editar</Button>
      </div>
    </LocalForm>
  )
}

export default Edit;