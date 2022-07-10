import React, {useContext} from 'react'; 
import Note from '../note/Note';
import './NoteDisplay.css';
import { AppProvider } from '../../AppContext';

const NoteDisplay = (props) => {
    const curr = useContext(AppProvider)
    return (
        <div className='notes-display'>
            { curr.currLanguage && curr.currNotes.map(note => <Note title={note.title} description={ note.description} />)}
        </div>
    )

};

export default NoteDisplay;