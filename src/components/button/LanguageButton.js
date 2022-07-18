import React, {useCallback, useContext} from 'react'; 
import './LanguageButton.css';

import { AppProvider } from '../../AppContext';

const URL = 'https://frequentquestions.herokuapp.com/languages/';


const LanguageButton = (props) => {
    const curr = useContext(AppProvider);


    const fetchNotes = useCallback(async (language) => {
        language = language.toLowerCase();
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.resetNoteClicked();
        curr.updateMessage('Loading Notes');
        const response = await fetch(`${URL}${language}/getNotes`)
        const data = await response.json();
        //update the global variable
        
        curr.updateNotes(data.reverse());
        curr.updateLanguage(props.name);
        curr.hideSpinner(); //equivalent to setting isLoading to false
    }, [])

    const languageButtonHandler = () => {
        curr.closeDropMenu();
        props.moveUp();
        fetchNotes(props.name);
    }
    const classname =curr.currLanguage !== undefined && (curr.currLanguage.toLowerCase() === props.name.toLowerCase())? "btn selected" : "btn";
    return (
         <button className={classname} onClick={languageButtonHandler} name={props.name} id={props._id}>
            {props.name}
        </button>
    )
};

export default LanguageButton;