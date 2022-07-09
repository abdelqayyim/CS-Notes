import React from 'react'; 
import './Background.css';

const Background = (props) => {

    return (
        <div className={props.className}>
            {console.log(props.className)}
            {props.children}
       </div>
    )
};

export default Background;