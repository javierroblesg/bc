import React, { useState, useEffect } from 'react';
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Link } from 'react-router-dom';
import {Card, Row, Col, CardHeader, CardTitle, CardBody, Button } from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import './UsersTable.css';

import { connect } from 'react-redux';
import { fetchUsers } from './UsersFunctions.js';
const mapStateToProps = state => {
  return {
    auth: state.auth,
    users: state.users
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers())
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

const UsersTable = props => {
  const [alert, setAlert] = useState(null);
  //delete user

  const [isAddUser, setIsAddUser] = useState(false);
  const toggleIsAddUser = () => {
    setIsAddUser((prev => !prev));
  }

  const refreshUsers = () => {
    props.fetchUsers();
  }

  useEffect(() => {
    if (!props.users.loaded && !props.users.isLoading) {
      props.fetchUsers();
    }
    if (props.users.errorMessage) {
      setAlert(
        <ReactBSAlert danger
          title="Error fetching users"
          confirmBtnText="Entendido"
          onConfirm={() => setAlert(null)}
          confirmBtnBsStyle="default"
        >
          {props.users.errorMessage}
        </ReactBSAlert>
      );
    }
  }, [props])

  return (
    <>
      {alert}
      <Row>
        <Col md="12">
          <p>
            <Link to="/home"><span className="text-muted">Inicio</span></Link>
            <span className="text-muted"> &gt;</span>{" "}
            <Link to="/users">Usuarios</Link>
          </p>
        </Col>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle style={{float: 'left'}} tag="h3">Usuarios</CardTitle>
              <Button style={{float: 'right'}} size="sm" className="btn btn-info" onClick={() => refreshUsers()}>
                  <i className="fa fa-refresh"></i>
                </Button>
              <Button style={{float: 'right'}} size="sm" className="tb btn btn-success" onClick={() => toggleIsAddUser()}>
                <i className="fa fa-user-plus"></i>
              </Button>
            </CardHeader>
            <CardBody>
              <ToolkitProvider
                data={props.users.users}
                keyField="id"
                columns={[
                  {
                    dataField: "id",
                    text: "id",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: "username",
                    text: "Username",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: "firstname",
                    text: "Nombre",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: "lastname",
                    text: "Apellido",
                    filter: textFilter(),
                    sort: true
                  }, {
                    dataField: "last_connection",
                    text: 'última conexión',
                    sort: false
                  }, {
                    dataField: 'link',
                    text: 'acciones',
                    headerStyle: (colum, colIndex) => {return { width: '8%'};},
                    formatter: (rowContent, row) => {
                      return (
                        <>
                          <Link to={`/users/${row.id}`}>
                            <i className="fa fa-pencil" style={{fontSize: 15, paddingRight: 10}}/>
                          </Link>
                          <i className="fa fa-user-times" style={{fontSize: 15, color: '#f5365c'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);

//headerStyle: (colum, colIndex) => {return { width: '15%'};}