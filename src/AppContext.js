import React, { useState } from 'react'; 
import Message from './components/message-popup/Message';

export const AppProvider = React.createContext();
const AppContext = (props) => {
    const [ notes, setNotes ] = useState([]);
    const [language, setLanguage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [noteTitle, setNoteTitle] = useState(undefined);
    const [noteDescription, setNoteDescription] = useState(undefined);
    const [buttonClicked, setButtonClicked] = useState(false); //this is to know whether a language has been
    const [noteClicked, setNoteClicked] = useState(false); 

    const currentDetails = {
        currLanguage :language,
        currNoteTitle: noteTitle,
        currNoteDescription: noteDescription,
        currNotes: notes, 
        languageClicked: buttonClicked, 
        noteClicked: noteClicked, 
        loading: isLoading,
        spinnerMessage: message,
        updateNotes: function (newNotes) {
            setNotes(newNotes);
            currentDetails.currNotes = newNotes;
        },
        updateLanguage: function (newLanguage) {
            setLanguage(newLanguage);
            setButtonClicked(true);
            currentDetails.currLanguage = newLanguage;
        }, 
        showSpinner: function () {
            setIsLoading(true);
        },
        hideSpinner: function () {
            setIsLoading(false);
        },
        updateMessage: function (newMessage) {
            setMessage(newMessage);
        }, 
        clickNote: function (note) {
            setNoteTitle(note.title);
            setNoteDescription(note.description);
            setNoteClicked(true);
        }, 
        resetNoteClicked: function(){
            setNoteClicked(false);
        }
    }
    return (
        <AppProvider.Provider value={currentDetails}>
            {isLoading && <Message message={currentDetails.spinnerMessage }/>}
            {props.children}
        </AppProvider.Provider>
    )
};

export default AppContext;