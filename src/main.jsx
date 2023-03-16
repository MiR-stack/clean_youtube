import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import {SnackbarProvider}  from 'notistack'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
  </Provider>
);
