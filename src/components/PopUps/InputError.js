import React, {useContext} from 'react'; 
import './InputError.css';
import { AppProvider } from '../../AppContext';
const InputError = (props) => {
    const curr = useContext(AppProvider);
    return (
        <div className={"error-box " + props.className}>
            <div className={ "mark "+ props.messageType}>{props.messageType === "negative"?<i className="fa-solid fa-xmark"></i>: <i className="fa-solid fa-check"></i>}</div>
            <div className='error-message'>{props.errorMessage}</div>
        </div>
    )
};

export default InputError;