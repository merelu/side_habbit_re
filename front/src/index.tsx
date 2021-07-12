import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import { history, store } from "@store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";

// axios.defaults.baseURL = "http://3.37.220.56:5000";
// axios.defaults.baseURL = "http://localhost:5000";
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
