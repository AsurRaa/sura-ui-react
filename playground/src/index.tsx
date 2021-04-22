import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./app/App";
import reportWebVitals from "./config/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
