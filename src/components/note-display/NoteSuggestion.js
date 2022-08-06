import React, {useContext, useState} from "react";
import "./NoteSuggestion.css";
import { AppProvider } from "../../AppContext";
import Note from "../note/Note";

const NoteSuggestion = (props) => {
    const curr = useContext(AppProvider);
  return (
    <div className="note-suggestion">
      {props.notes.map(
        (note) =>
          note._id !== curr.currentNote.id && (
            <Note
                      title={note.title}
                      description={note.description}
                      noteId={note._id}
                      key={note._id}
                      noteDetail={note.noteDetail}
                      noteLanguage={note.noteLanguage}
            />
          )
      )}
    </div>
  );
};

export default NoteSuggestion;
