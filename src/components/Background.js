import React, {useContext} from 'react'; 
import './Background.css';

import { AppProvider } from '../AppContext';


const Background = (props) => {
    const curr = useContext(AppProvider);

    const backgroundClickHandler = (event) => {
        if (event.target.classList[0] !== "fa-solid") {
            curr.closeDropMenu();
        }
    }
    

    return (
        <div className={props.className} onClick={backgroundClickHandler}>
            {props.children}
        </div>
    )
    
};

export default Background;