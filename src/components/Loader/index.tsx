import React from "react";
import "./style.css";

const Loader = () => (
  <div className="loader-window">
    <div className="loader-content-wrap">
      <div className="loader-content-block">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div className="loader-back" />
  </div>
);

export default Loader;
