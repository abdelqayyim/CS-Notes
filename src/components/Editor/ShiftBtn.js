import React from 'react'; 
import './ShiftBtn.css';

const ShiftBtn = (props) => {
    
    return (
        <div className="shift-btn" onClick={props.moveUp}>
            <i class="fa-solid fa-arrow-up"></i>
        </div>
    )
};

export default ShiftBtn;