import React, { useContext, useRef, useCallback } from "react";
import Note from "../note/Note";
import "./NoteDisplay.css";
import { AppProvider} from "../../AppContext";
import Editor from "../Editor/Editor";


const NoteDisplay = (props) => {
  const curr = useContext(AppProvider);

  let title = useRef();
  let description = useRef();

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  
  const saveNoteHandler = useCallback(
    async (detail,) => {
      let id = curr.currentLanguages.filter((language) => language.name === curr.currentLanguage)[0]._id;
      //detail is the code the user has inputted
      let noteToSave = {
        title: title.current.innerText,
        description: description.current.innerText,
        noteDetail: detail,
        _id: curr.currentNote.noteID,
        language: curr.currentNote.noteLanguage
      };
      curr.saveNote(id, noteToSave);
    },
    [curr]
  );
  const changeNoteLanguage = useCallback(
    async (language, text) => {
      let id = curr.currentLanguages.filter((language) => language.name === curr.currentLanguage)[0]._id;
      //detail is the code the user has inputted
      let noteToSave = {
        title: curr.currentNote.noteTitle,
        description: curr.currentNote.noteDescription,
        noteDetail: text,
        _id: curr.currentNote.noteID,
        language: language
      };
      curr.saveNote(id, noteToSave);
    },
    [curr]
  );


  const deleteNoteHandler = useCallback(
    async (detail) => {
      let id = curr.currentLanguages.filter((language) => language.name === curr.currentLanguage)[0]._id;
      //detail is the code the user has inputted
      let noteToDelete = {
        title: title.current.innerText,
        description: description.current.innerText,
        noteDetail: detail,
        _id: curr.currentNote.id,
      };
      curr.deleteNote(id, noteToDelete);
    },
    [curr]
  );

  if (
    curr.currentLanguage !== undefined &&
    curr.currentNote.noteTitle === undefined
  ) {
    return (
      <div className="notes-display">
        {curr.currentNotes.map((note) => (
          <Note
            title={titleCase(note.title)}
            description={note.description}
            key={note._id}
            noteDetail={note.noteDetail}
            noteId={note._id}
            noteLanguage={note.language}
          />
        ))}
      </div>
    );
  } else if (
    curr.currentLanguage !== undefined &&
    curr.currentNote.noteTitle !== undefined
  ) {
    return (
      <div className="clickedNote-container">
        <div className="note-section">
          <div
            className={`title ${curr.currentAppMode}`}
            contentEditable={true}
            ref={title}
          >
            {titleCase(curr.currentNote.noteTitle)}
          </div>
          <div
            className={`description ${curr.currentAppMode}`}
            ref={description}
            contentEditable={true}
          >
            {curr.currentNote.noteDescription.length === 0 && "No Description"}
            {curr.currentNote.noteDescription}
          </div>

          <Editor
            noteLanguage={curr.currentLanguage.toString().toLowerCase()}
            noteDetail={curr.currentNote.noteDetail}
            onSave={saveNoteHandler}
            onDelete={deleteNoteHandler}
            onChangeNoteLanguage={changeNoteLanguage}
                />
            
            
        </div>
      </div>
    );
  }
};
export default NoteDisplay;
// )https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+aspnet+c+csharp+cpp+fsharp+git+go+graphql+java+javadoc+javadoclike+markdown+markup-templating+mongodb+php+python+jsx+regex+ruby+rust+sql+swift+typescript&plugins=line-numbers+highlight-keywords+command-line
//FIXME: just put the note object in one variable in the global context, reduces the need to create multiple variale in curr
