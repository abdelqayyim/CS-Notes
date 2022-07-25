import React, {useContext, useRef, useCallback} from 'react'; 
import Note from '../note/Note';
import './NoteDisplay.css';
import { AppProvider } from '../../AppContext';
import Editor from '../Editor/Editor';


const NoteDisplay = (props) => {
    const curr = useContext(AppProvider);
    let note = useRef();
    let result = useRef();
    let pre = useRef();
    let title = useRef();
    let description = useRef();


    const saveNoteHandler = useCallback(async (detail) => {//detail is the code the user has inputted
        let noteToSave = {
            "title": title.current.innerText,
            "description": description.current.innerText,
            "noteDetail": detail,
            "_id": curr.currNoteId
        }
        console.log(noteToSave);
        console.log(curr)

        //TASK: make sure to update the note title, description and detail in the global curr
        curr.showSpinner(); 
        curr.updateMessage('Saving Note')
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${curr.currLanguage.toLowerCase()}/updateNote`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteToSave),
        })
        const data = await response;
        curr.hideSpinner();

        if (response.ok) {
            curr.manageBottomMessage(true, "positive", `Note was Successfully Saved`);
            setTimeout(() => { 
                curr.manageBottomMessage(false, "positive", `Note was Successfully Saved`);
            }, 2000)
        }
        else {
            curr.manageBottomMessage(true, "negative", `Error while saving note`);
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", `Error while saving note`);
            },2000)
            console.log(response)
        }
    })
    

    if (curr.languageClicked && !curr.noteClicked) {
        return (
            <div className='notes-display'>
                {curr.currNotes.map(note => 
                    <Note title={note.title} description={note.description} key={note._id} noteDetail={note.noteDetail} noteId={note._id} noteLanguage={ note.noteLanguage} />
                )}
            </div>
        )
    }
    else if (curr.languageClicked && curr.noteClicked) {
        return (
            <div className='clickedNote-container'>
                <div className='note-section'>
                    <div className='title' contentEditable={true} ref={title}>
                        { curr.currNoteTitle}
                    </div>
                    <div className='description' ref={description} contentEditable={true}>
                        {curr.currNoteDescription.length === 0 && "No Description"}
                    { curr.currNoteDescription}
                    </div>

                    <Editor noteLanguage={curr.currLanguage.toString().toLowerCase()} noteDetail={curr.currNoteDetail} onSave={saveNoteHandler} />
                    
                    
                </div>
                <div className='note-suggestion'>
                {curr.currNotes.map(note => 
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