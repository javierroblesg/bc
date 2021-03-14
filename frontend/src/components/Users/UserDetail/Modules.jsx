import React from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Label, Input } from 'reactstrap';

const Modules = props => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Permisos de Usuario</CardTitle>
      </CardHeader>
      <CardBody style={{paddingTop: 10}}>
        <Row>
          <Col>
            <Label htmlFor="usersModule" className="form-control-label">Usuarios</Label>
            <Input type="select" name="usersModule" id="usersModule" className="form-control"
              onChange={(event) => props.handleModuleChange(1, event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[1] : ""} >
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor="inventoryModule" className="form-control-label">Inventario</Label>
            <Input type="select" name="inventoryModule" id="inventoryModule" className="form-control"
              onChange={(event) => props.handleModuleChange("2", event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[2] : ""}>
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor="clientsModule" className="form-control-label">Clientes</Label>
            <Input type="select" name="clientsModule" id="clientsModule" className="form-control"
              onChange={(event) => props.handleModuleChange("3", event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[3] : ""}>
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor="posModule" className="form-control-label">Punto de Venta</Label>
            <Input type="select" name="posModule" id="posModule" className="form-control"
              onChange={(event) => props.handleModuleChange("4", event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[4] : ""}>
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor="agendaModule" className="form-control-label">Agenda</Label>
            <Input type="select" name="agendaModule" id="agendaModule" className="form-control"
              onChange={(event) => props.handleModuleChange("5", event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[5] : ""}>
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor="reportsModule" className="form-control-label">Reportes</Label>
            <Input type="select" name="reportsModule" id="reportsModule" className="form-control"
              onChange={(event) => props.handleModuleChange("6", event.target.value)} bsSize="sm"
              value={props.singleUser.user.modules ? props.singleUser.user.modules[6] : ""}>
                <option value="0">Sin acceso</option>
                <option value="1" >Ver</option>
                <option value="2">Editar</option>
              </Input>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Modules;