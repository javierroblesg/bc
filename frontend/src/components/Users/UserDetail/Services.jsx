import React, { useState, useEffect } from 'react';
import ReactBSAlert from "react-bootstrap-sweetalert";
import { CardHeader, CardTitle, CardBody, Label, Input } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';
import { fetchServicesCategories, updateUserServices } from '../UsersFunctions.js';
const mapStateToProps = state => {
  return {
    singleUser: state.singleUser,
    servicesCategories: state.servicesCategories
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchServicesCategories: () => dispatch(fetchServicesCategories()),
  updateUserServices: (userId, categoryId) => dispatch(updateUserServices(userId, categoryId)),
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

const Services = props => {
  const handleServiceChange = (category, value) => {
    value = (value === '1');
    props.updateUserServices(props.match.params.userId, category);
    console.log(category, value);
    //console.log(props.singleUser.user.categories[category-1]);
    //props.singleUser.user.categories[category-1].has_category = value;
  }

  const [alert, setAlert] = useState(null);
  useEffect(() => {
    if (!props.servicesCategories.loaded && !props.servicesCategories.isLoading) {
      props.fetchServicesCategories();
    }
    if (props.servicesCategories.errorMessage) {
      setAlert(
        <ReactBSAlert danger
          title="Error cargando categorías"
          confirmBtnText="Entendido"
          onConfirm={() => setAlert(null)}
          confirmBtnBsStyle="default"
        >
          {props.servicesCategories.errorMessage}
        </ReactBSAlert>
      );
    }
  }, [props])
  return(
    <CardHeader>
      {alert}
      <CardTitle tag="h4">
        Servicios del usuario
      </CardTitle>
      <CardBody className="table-card">
        {props.singleUser.user.can_services ?
          <ToolkitProvider
            data={props.singleUser.user.categories}
            keyField="id"
            columns={[
              {
                dataField: "id",
                text: "id",
                sort: true
              }, {
                dataField: "name",
                text: "nombre",
                sort: true
              }, {
                dataField: 'link',
                text: '¿realiza el servicio?',
                formatter: (rowContent, row) => {
                  return (
                  <>
                    <Input type="select" name="has_category" id="has_category" className="form-control" bsSize="sm"
                      onChange={(event) => handleServiceChange(row.id, event.target.value)}
                      value={row.has_category ? "1" : "0"}>
                        <option value="0">No</option>
                        <option value="1" >Sí</option>
                      </Input>
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
                  id="react-bs-table"
                />
              </div>
            )}
          </ToolkitProvider>
          : <p>Este usuario no puede realizar servicios</p>
        }
      </CardBody>
    </CardHeader>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);