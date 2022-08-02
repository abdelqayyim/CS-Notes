import React, {useCallback, useContext} from 'react'; 
import './LanguageButton.css';
import { ACTIONS, AppProvider } from '../../AppContext';

const LanguageButton = (props) => {
    const curr = useContext(AppProvider); // global context

    const languageButtonHandler = () => {
        //change the global current language everytime a new language is pressed
        curr.callDispatch({ type: ACTIONS.CHANGE_CURRENT_LANGUAGE, payload: { language: props.name } });
        props.moveUp(); //move the app title and the buttons up (animation)
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