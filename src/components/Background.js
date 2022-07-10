import React from 'react'; 
import './Background.css';

export const LanguageContext = React.createContext();



const Background = (props) => {

    

    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
    
};

export default Background;