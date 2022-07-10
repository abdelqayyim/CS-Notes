import React, { useState } from 'react'; 
import Message from './components/message-popup/Message';

export const AppProvider = React.createContext();
const AppContext = (props) => {
    const [ notes, setNotes ] = useState([]);
    const [language, setLanguage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const currentDetails = {
        currLanguage :language,
        currNoteTitle: undefined,
        currNoteDescription: undefined,
        currNotes: notes, 
        lodaing: isLoading,
        spinnerMessage: message,
        updateNotes: function (newNotes) {
            setNotes(newNotes);
            currentDetails.currNotes = newNotes;
        },
        updateLanguage: function (newLanguage) {
            setLanguage(newLanguage);
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
        }
    }
    console.log(currentDetails);
    return (
        <AppProvider.Provider value={currentDetails}>
            {isLoading && <Message message={currentDetails.spinnerMessage } />}
            {props.children}
        </AppProvider.Provider>
    )
};

export default AppContext;