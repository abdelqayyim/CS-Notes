import React, {useCallback, useContext} from 'react'; 
import './LanguageButton.css';

import { AppProvider } from '../../AppContext';

const URL = 'https://frequentquestions.herokuapp.com/languages/';


const LanguageButton = (props) => {
    const curr = useContext(AppProvider);


    const languageButtonHandler = () => {
        curr.closeDropMenu();
        props.moveUp();
        curr.fetchNotes(props.name);
    }

    const correspondsToCurrentLanguage = (curr.currLanguage !== undefined) && (curr.currLanguage.toLowerCase() === props.name.toLowerCase()); 
    const classname = correspondsToCurrentLanguage? "btn selected" : "btn";
    
    return (
         <button className={classname} onClick={languageButtonHandler} name={props.name} id={props._id}>
            {props.name}
        </button>
    )
};

export default LanguageButton;