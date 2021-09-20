import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import store from './store'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <Provider store={store}>
    <ToastContainer hideProgressBar={true} pauseOnFocusLoss={false} />
    <App/>
  </Provider>,
  document.getElementById("root")
);
