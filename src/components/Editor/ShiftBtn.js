import React from 'react'; 
import './ShiftBtn.css';

const ShiftBtn = (props) => {
    return (
        <div className={`shift-btn ${props.className}`} onClick={props.move}>
            <i class="fa-solid fa-arrow-up"></i>
        </div>
    )
};

export default ShiftBtn;