import React, {useCallback, useContext} from 'react'; 
import './LanguageButton.css';

import { AppProvider } from '../../AppContext';


const LanguageButton = (props) => {
    const curr = useContext(AppProvider);


    const fetchNotes = useCallback(async (language) => {
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.resetNoteClicked();
        curr.updateMessage('Loading Notes');
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/getNotes`)
        const data = await response.json();
        //update the global variable
        curr.updateNotes(data.reverse());
        curr.updateLanguage(props.name);
        curr.hideSpinner(); //equivalent to setting isLoading to true
    }, [])

    const languageButtonHandler = () => {
        props.moveUp();
        fetchNotes(props.name);
    }
    
    return (
         <button className='btn' onClick={languageButtonHandler} name={props.name} id={props._id}>
            {props.name}
        </button>
    )
};

export default LanguageButton;