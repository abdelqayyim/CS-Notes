import React from "react";
import "./InputError.css";
const InputError = (props) => {
  return (
    <div className={"error-box " + props.className}>
      {/* <div className={ "mark "+ props.messageType}></div> */}
      
      <div className={ "mark "+ props.messageType}></div>
      <div className="error-message">{props.errorMessage}</div>
    </div>
  );
};

export default InputError;
