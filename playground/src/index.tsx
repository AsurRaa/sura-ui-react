import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.less";
import reportWebVitals from "./config/reportWebVitals";
import AppProvider from "./app/AppProvider";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
