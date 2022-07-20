import React, {useContext, useRef} from 'react'; 
import Note from '../note/Note';
import './NoteDisplay.css';
import { AppProvider } from '../../AppContext';
import Prism from "prismjs";
import "../Themes/prism.css";

const NoteDisplay = (props) => {
    const curr = useContext(AppProvider);
    let note = useRef();
    let result = useRef();
    

    setTimeout(() => {
        Prism.highlightAll();
    },1000)

    const change = ()=>{
        result.current.innerHTML = note.current.value.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");;
        Prism.highlightAll();
    }
    const syncScroll = (element)=>{
        // note.current.scrollTop = element.current.scrollTop;
        // note.current.scrollLeft = element.current.scrollLeft;
        result.current.scrollIntoView();
        note.current.scrollIntoView();
        console.log("Hello")
    }

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
        const codeString = 'def Hello(): \n\tprint("Hello world")';
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

                    <div className='code'>
                        <textarea spellCheck={false} ref={note} onInput={() => { change(); syncScroll(this) }} onScroll={() => { syncScroll(this) }} className="textarea">

                        </textarea>
                        <pre  className="language-javascript script">
                            <code ref={result} className="highlight">
                                
                            </code>
                        </pre>
                    </div>
                    
                    
                    
                </div>
                <div className='note-suggestion'>
                {curr.currNotes.map(note => 
                    <Note title={note.title} description={note.description} key={ note._id} noteDetail={note.noteDetail} />
                )}
                </div>
            </div>
        )
    }
};
export default NoteDisplay;
        // )https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+aspnet+c+csharp+cpp+fsharp+git+go+graphql+java+javadoc+javadoclike+markdown+markup-templating+mongodb+php+python+jsx+regex+ruby+rust+sql+swift+typescript&plugins=line-numbers+highlight-keywords+command-line
