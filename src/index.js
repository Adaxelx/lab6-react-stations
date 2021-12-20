import React from "react";
import ReactDOM from "react-dom";

import { Form } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>,
  rootElement
);
