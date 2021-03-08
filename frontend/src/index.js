import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import RouterComponent from './layouts/RouterComponent'

//styles
import "bootstrap/dist/css/bootstrap.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';

//store
import { Provider } from 'react-redux';
import { ConfigureStore } from './router/configureStore'
const store = ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();