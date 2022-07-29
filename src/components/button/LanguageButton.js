import React, {useCallback, useContext} from 'react'; 
import './LanguageButton.css';

import { ACTIONS, AppProvider } from '../../AppContext';

const URL = 'https://frequentquestions.herokuapp.com/languages/';


const LanguageButton = (props) => {
    const curr = useContext(AppProvider);


    const languageButtonHandler = () => {
        curr.callDispatch({ type: ACTIONS.CHANGE_CURRENT_LANGUAGE, payload: { language: props.name } });
        props.moveUp();
        curr.fetchNotes(props.name.toLowerCase());
    }

    const correspondsToCurrentLanguage = (curr.currentLanguage !== undefined) && (curr.currentLanguage.toLowerCase() === props.name.toLowerCase()); 
    const classname = correspondsToCurrentLanguage? "btn selected" : "btn";
    
    return (
         <button className={classname} onClick={languageButtonHandler} name={props.name} id={props._id}>
            {props.name}
        </button>
    )
};

export default LanguageButton;