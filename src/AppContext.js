import React, { useState, useCallback } from 'react'; 
import Message from './components/message-popup/Message';
import AddLanguagePopUp from './components/PopUps/AddLanguagePopUp';
import DeleteLanguagePopUp from './components/PopUps/DeleteLanguagePopUp';
import InputError from './components/PopUps/InputError';
import AddNotePopUp from './components/PopUps/AddNotePopUp';

export const AppProvider = React.createContext();
const AppContext = (props) => {
    const [ notes, setNotes ] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [noteTitle, setNoteTitle] = useState(undefined);
    const [noteDetail, setNoteDetail] = useState(undefined);
    const [noteDescription, setNoteDescription] = useState(undefined);
    const [buttonClicked, setButtonClicked] = useState(false); //this is to know whether a language has been
    const [noteClicked, setNoteClicked] = useState(false); 
    const [addLanguage, setAddLanguage] = useState(false); 
    const [deleteLanguage, setDeleteLanguage] = useState(false); 
    const [dropMenu, setDropMenu] = useState(false);
    const [clickAddNote, setClickAddNote] = useState(false);
    const [updateBtn, setUpdateBtn] = useState(false);

    const [overlayClicked, setOverlayClicked ] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const [mType, setMType] = useState(""); //messageError type
    const [errorMessage, setErrorMessage] = useState("");

    const currentDetails = {
        currLanguage :language,
        currLanguages: languages,
        currNoteTitle: noteTitle,
        currNoteDescription: noteDescription,
        currNoteDetail: noteDetail,
        currNotes: notes, 
        languageClicked: buttonClicked, 
        noteClicked: noteClicked, 
        loading: isLoading,
        spinnerMessage: message,
        addLanguageClicked: addLanguage,
        deleteLanguageClicked: deleteLanguage,
        messageType: mType, // the popUp that appears at the bottom
        inputErrorMessage: errorMessage,
        inputError: errorInput, //if there is an error in the input
        menuActive: dropMenu,
        addNoteClicked: clickAddNote,
        
        updateNotes: function (newNotes) {
            setNotes(newNotes);
            currentDetails.currNotes = newNotes;
        },
        updateLanguages: function (lang) {
            setLanguages(lang)
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
            setNoteDetail(note.noteDetail);
            setNoteClicked(true);
        }, 
        resetNoteClicked: function(){
            setNoteClicked(false);
        }, 
        addLanguageClick: function(){
            setAddLanguage(prev=>!prev);
        },
        deleteLanguageClick: function(){
            setDeleteLanguage(prev=>!prev)
        },
        manageBottomMessage: function (bool, type, msg){
            setErrorInput(bool);
            setMType(type);
            setErrorMessage(msg);
        },
        toggleDropMenu: function(){
            setDropMenu(prev => !prev);
        },
        closeDropMenu: function(){
            setDropMenu(false);
        },
        toggleAddNoteClick: function () {
            setClickAddNote(prev => !prev);
        },
        fetchLanguages: useCallback(async () => {
            currentDetails.showSpinner(); //equivalent to setting isLoading to true
            // currentDetails.updateMessage('Loading Data')
            const response = await fetch('https://frequentquestions.herokuapp.com/languages/')
            const data = await response.json();
            
            currentDetails.updateLanguages(data.reverse())
            
            currentDetails.hideSpinner();
            currentDetails.updateMessage(null)
        }, []),
        fetchNotes: useCallback(async (language) => {
            language = language.toLowerCase();
            currentDetails.showSpinner(); //equivalent to setting isLoading to true
            currentDetails.resetNoteClicked();
            currentDetails.updateMessage('Loading Notes');
            const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/getNotes`)
            const data = await response.json();
            //update the global variable
            
            currentDetails.updateNotes(data.reverse());
            currentDetails.updateLanguage(language);
            currentDetails.hideSpinner(); //equivalent to setting isLoading to false
        }, [])
    }
    return (
        <AppProvider.Provider value={currentDetails}>
            {isLoading && <Message message={currentDetails.spinnerMessage }/>}
            {props.children}
            {currentDetails.addLanguageClicked && <AddLanguagePopUp />}
            {currentDetails.deleteLanguageClicked && <DeleteLanguagePopUp />}
            <InputError messageType={currentDetails.messageType} errorMessage={currentDetails.inputErrorMessage} className={currentDetails.inputError ? "active" : ""} />
            {currentDetails.addNoteClicked && <AddNotePopUp/>}
        </AppProvider.Provider>
    )
};

export default AppContext;