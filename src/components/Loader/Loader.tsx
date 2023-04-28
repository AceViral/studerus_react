import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader_wrap">
      <div className="bubbles">
        <h1>Pending</h1>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
};
