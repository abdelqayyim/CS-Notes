import React, {useContext, useRef, useCallback} from 'react'; 
import Note from '../note/Note';
import './NoteDisplay.css';
import { ACTIONS,AppProvider } from '../../AppContext';
import Editor from '../Editor/Editor';


const NoteDisplay = (props) => {
    const curr = useContext(AppProvider);
    let note = useRef();
    let result = useRef();
    let pre = useRef();
    let title = useRef();
    let description = useRef();

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
    }

    const saveNoteHandler = useCallback(async (detail) => {//detail is the code the user has inputted
        let noteToSave = {
            title: title.current.innerText,
            description: description.current.innerText,
            noteDetail: detail,
            _id: curr.currentNote.id
        }
        curr.saveNote(curr.currentLanguage,noteToSave);
    })

    const deleteNoteHandler = useCallback(async (detail) => {//detail is the code the user has inputted
        let noteToDelete = {
            title: title.current.innerText,
            description: description.current.innerText,
            noteDetail: detail,
            _id: curr.currentNote.id
        }
        curr.deleteNote(curr.currentLanguage,noteToDelete);
    })
    
    if (curr.currentLanguage !== undefined && curr.currentNote.noteTitle === undefined) {
        return (
            <div className='notes-display'>
                {curr.currentNotes.map(note => 
                    <Note title={titleCase(note.title)} description={note.description} key={note._id} noteDetail={note.noteDetail} noteId={note._id} noteLanguage={ note.noteLanguage} />
                )}
            </div>
        )
    }
    else if (curr.currentLanguage !== undefined && curr.currentNote.noteTitle !== undefined) {
        return (
            <div className='clickedNote-container'>
                <div className='note-section'>
                    <div className='title' contentEditable={true} ref={title}>
                        { titleCase(curr.currentNote.noteTitle)}
                    </div>
                    <div className='description' ref={description} contentEditable={true}>
                        {curr.currentNote.noteDescription.length === 0 && "No Description"}
                    { curr.currentNote.noteDescription}
                    </div>

                    <Editor noteLanguage={curr.currentLanguage.toString().toLowerCase()} noteDetail={curr.currentNote.noteDetail} onSave={saveNoteHandler} onDelete={deleteNoteHandler} />
                    
                    
                </div>
                <div className='note-suggestion'>
                {curr.currentNotes.map(note => 
                    <Note title={note.title} description={note.description} key={ note._id} noteDetail={note.noteDetail} noteLanguage={ note.noteLanguage}/>
                )}
                </div>
            </div>
        )
    }
};
export default NoteDisplay;
        // )https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+aspnet+c+csharp+cpp+fsharp+git+go+graphql+java+javadoc+javadoclike+markdown+markup-templating+mongodb+php+python+jsx+regex+ruby+rust+sql+swift+typescript&plugins=line-numbers+highlight-keywords+command-line
//FIXME: just put the note object in one variable in the global context, reduces the need to create multiple variale in curr