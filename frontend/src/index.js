import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persiststore } from "./Redux/Store/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
