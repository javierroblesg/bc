import React from 'react';
import { Row, Col } from 'reactstrap';

const View = props => {
  return (
    <>
      <Row>
        <Col md="3">
          <h5>ID usuario</h5>
          <p className="text-muted">{props.singleUser.user.id}</p>
        </Col>
        <Col md="3">
          <h5>Nombre</h5>
          <p className="text-muted">{props.singleUser.user.firstname}</p>
        </Col>
        <Col md="3">
          <h5>Apellido</h5>
          <p className="text-muted">{props.singleUser.user.lastname}</p>
        </Col>
        <Col md="3">
          <h5>Username</h5>
          <p className="text-muted">{props.singleUser.user.username}</p>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <h5>Tipo de Usuario</h5>
          <p className="text-muted">{props.singleUser.loaded ? props.singleUser.user.UserType.name : null}</p>
        </Col>
        <Col md="3">
          <h5>Realiza servicios</h5>
          <p className="text-muted">{props.singleUser.user.can_services ? 'Sí': 'No'}</p>
        </Col>
        <Col md="3">
          <h5>Última Conexión</h5>
          <p className="text-muted">{props.singleUser.user.last_connection}</p>
        </Col>
        <Col md="3">
          <h5>Creado el</h5>
          <p className="text-muted">{props.singleUser.user.createdAt}</p>
        </Col>
      </Row>
    </>
  )
}

export default View;