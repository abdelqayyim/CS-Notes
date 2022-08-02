import React, {useContext} from 'react'; 
import './Background.css';

import {ACTIONS, AppProvider } from '../AppContext';


const Background = (props) => {
    const curr = useContext(AppProvider);

    const backgroundClickHandler = (event) => {
        if (event.target.classList[0] !== "fa-solid") {
            curr.callDispatch({type: ACTIONS.TOGGLE_MENU, payload:{mode: false}})
        }
    }
    
    return (
        <div className={props.className} onClick={backgroundClickHandler}>
            {props.children}
        </div>
    )
    
};

export default Background;