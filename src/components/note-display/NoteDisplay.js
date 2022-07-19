import React, {useContext} from 'react'; 
import Note from '../note/Note';
import './NoteDisplay.css';
import { AppProvider } from '../../AppContext';

const NoteDisplay = (props) => {
    const curr = useContext(AppProvider)

    if (curr.languageClicked && !curr.noteClicked) {
        return (
            <div className='notes-display'>
                {curr.currNotes.map(note => 
                    <Note title={note.title} description={note.description} key={ note._id} noteDetail={note.noteDetail} />
                )}
            </div>
        )
    }
    else if (curr.languageClicked && curr.noteClicked) {
        return (
            <div className='clickedNote-container'>
                <div className='note-section'>
                    <div className='title'>
                        { curr.currNoteTitle}
                    </div>
                    <div className='description'>
                        {curr.currNoteDescription.length === 0 && "No Description"}
                    { curr.currNoteDescription}
                    </div>
                    <textarea className="code">
                        {curr.currNoteDetail}
                    </textarea>
                    {/* <div className='code'>
                        {curr.currNoteDetail}
                    </div> */}
                </div>
                <div className='note-suggestion'>
                {curr.currNotes.map(note => 
                    <Note title={note.title} description={note.description} key={ note._id} noteDetail={note.noteDetail} />
                )}
                </div>
            </div>
        )
    }
//Hello
};
export default NoteDisplay;