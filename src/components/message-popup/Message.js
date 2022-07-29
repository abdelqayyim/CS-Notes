import React from "react";
import ReactDOM from "react-dom";
import "./Message.css";
import * as SVGLoaders from "svg-loaders-react";

const Message = (props) => {
  return ReactDOM.createPortal(
    <div className="overlay active">
      {/* <div className='overlay active'></div> */}
      <div className="loader-popup">
        <SVGLoaders.TailSpin className="loader" />
        <p>{props.message}</p>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};
// spinner options [Audio, BallTriangle, Bars, Circles, Grid, Hearts, Oval, Puff, Rings, SpinningCircles, TailSpin, Threedots]

export default Message;
