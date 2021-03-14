import React, { useState, useEffect } from 'react';
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Link } from 'react-router-dom';
import {Card, Row, Col, CardHeader, CardTitle, CardBody, Button, Tooltip } from "reactstrap";
import AddUserType from './AddUserType';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { connect } from 'react-redux';
import { fetchUserTypes, fetchDeleteUserType } from './UserTypeFunctions.js';
const mapStateToProps = state => {
  return {
    auth: state.auth,
    userTypes: state.userTypes
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchUserTypes: () => dispatch(fetchUserTypes()),
  fetchDeleteUserType: (userTypeId)  => dispatch(fetchDeleteUserType(userTypeId))
})

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: true,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }
      </label>
    </div>
  )
});

const NoDataIndication = () => (
  <div className="text-center">
    <div className="spinner-grow text-info" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const UserTypesTable = props => {
  const [alert, setAlert] = useState(null);
  const handleDelete = (userTypeId) => {
    setAlert(
      <ReactBSAlert
        custom
        title="Borrar tipo de usuario?"
        customIcon={
            <i style={{fontSize: 50, color: '#17a2b8', paddingBottom: 15}} className="fa fa-question-circle"></i>
        }
        onConfirm={() => {setAlert(null); props.fetchDeleteUserType(userTypeId)}}
        onCancel={() => setAlert(null)}
        showCancel
        confirmBtnBsStyle="btn btn-success white"
        confirmBtnText="Borrar"
        cancelBtnBsStyle="btn btn-warning white"
        cancelBtnText="Cancelar"
        >
      </ReactBSAlert>
    )
  }

  const [isAddUserType, setIsAddUserType] = useState(false);
  const toggleIsAddUserType = () => {
    setIsAddUserType((prev => !prev));
  }

  const refreshUserTypes = () => {
    props.fetchUserTypes();
  }

  useEffect(() => {
    if (!props.userTypes.loaded && !props.userTypes.isLoading) {
      props.fetchUserTypes();
    }
    if (props.userTypes.errorMessage) {
      setAlert(
        <ReactBSAlert danger
          title="Error cargando tipos de usuario"
          confirmBtnText="Entendido"
          onConfirm={() => setAlert(null)}
          confirmBtnBsStyle="default"
        >
          {props.userTypes.errorMessage}
        </ReactBSAlert>
      );
    }
  }, [props])

  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);
  const [tooltipOpen3, setTooltipOpen3] = useState(false);
  const toggle3 = () => setTooltipOpen3(!tooltipOpen3);
  return (
    <>
      {alert}
      <AddUserType isAddUserType={isAddUserType} toggleIsAddUserType={toggleIsAddUserType} />
      <Row>
        <Col md="12">
          <p>
            <Link to="/home"><span className="text-muted">Inicio</span></Link>
            <span className="text-muted"> &gt;</span>{" "}
            <Link to="/users" style={{fontSize: 14}}><span className="text-muted">Usuarios</span></Link>
            <span className="text-muted"> &gt;</span>{" "}
            <Link to="/users" style={{fontSize: 14}}>Tipos de Usuarios</Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle style={{float: 'left'}} tag="h3">Tipos de Usuarios</CardTitle>
              <Button style={{float: 'right'}} size="sm" className="btn btn-info" onClick={() => refreshUserTypes()} id ="refreshUsers">
                <i className="fa fa-refresh"></i>
              </Button>
              <Tooltip placement="bottom" isOpen={tooltipOpen1} target="refreshUsers" toggle={toggle1}>
                Actualizar
              </Tooltip>
              {props.auth.modules[1] === 2 ?
                <>
                  <Button style={{float: 'right'}} size="sm" className="tb btn btn-success" onClick={() => toggleIsAddUserType()} id="addUser">
                    <i className="fa fa-user-plus"></i>
                  </Button>
                  <Tooltip placement="bottom" isOpen={tooltipOpen2} target="addUser" toggle={toggle2}>
                    Agregar
                  </Tooltip>
                </>
              : null}
            </CardHeader>
            <CardBody className="table-card">
              <ToolkitProvider
                data={props.userTypes.userTypes}
                keyField="id"
                columns={[
                  {
                    dataField: "id",
                    text: "id",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: "name",
                    text: "nombre",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: 'link',
                    text: 'acciones',
                    headerStyle: (colum, colIndex) => {return { width: '8%'};},
                    formatter: (rowContent, row) => {
                      return (
                        <>
                          <Link to={`/user_types/${row.id}`}>
                            <i className="fa fa-pencil" style={{fontSize: 15, paddingRight: 10}}/>
                          </Link>
                          <i className="fa fa-user-times" onClick={() => handleDelete(row.id)} style={{fontSize: 15, color: '#f5365c', cursor: 'pointer'}}/>
                        </>
                      )
                    }
                  }
                ]}
              >
                {props => (
                  <div className="py-4 table-responsive">
                    <BootstrapTable
                      ref={el => (props.componentRef = el)}
                      {...props.baseProps}
                      bootstrap4={true}
                      noDataIndication={NoDataIndication}
                      pagination={pagination}
                      bordered={false}
                      rowEvents={{}}
                      filter={ filterFactory() }
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTypesTable);