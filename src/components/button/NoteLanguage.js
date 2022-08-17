import React, {Fragment, useState} from 'react'; 
import ChangeNoteLang from '../PopUps/ChangeNoteLang';
import './NoteLanguage.css';

const NoteLanguage = (props) => {
    const [showNoteChange, setShowNoteChange] = useState(false);
    const changeLang = (lang) => {
        setShowNoteChange(true);
    }
    const closePop = () => {
        setShowNoteChange(false);
    }
    const submitChange = (newLang) => {
        props.changeLanguage(newLang)
    }
    return (
        <Fragment>
            <div className="note-lang" onClick={changeLang} >
            {props.noteLanguage === "cs" ? "c#" : props.noteLanguage}
        </div>
            {showNoteChange && <ChangeNoteLang closePop={closePop} saveChange={ submitChange} /> }
        </Fragment>
    )
};

export default NoteLanguage;