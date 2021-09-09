import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ClientWrapper } from "./request/client";
import { LoadingWrapper } from "./helpers/loadingContext";

ReactDOM.render(
  <React.StrictMode>
    <LoadingWrapper>
      <ClientWrapper>
        <App />
      </ClientWrapper>
    </LoadingWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
