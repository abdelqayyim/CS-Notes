import React from 'react'; 
import './InputError.css';
const InputError = (props) => {
    return (
        <div className={"error-box " + props.className}>
            <div className={ "mark "+ props.messageType}>{props.messageType === "negative"?<i className="fa-solid fa-xmark"></i>: <i className="fa-solid fa-checkmark"></i>}</div>
            <div className='error-message'>{props.errorMessage}</div>
        </div>
    )
};

export default InputError;