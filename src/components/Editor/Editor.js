import React, { useRef, useState, useContext, useEffect, useCallback } from "react";
import Prism from "prismjs";
import "../Themes/prismc.css";
import "./Editor.css";
import NoteText from "./NoteText";
import NoteImage from "./NoteImage";
import ChangeNoteLang from "../PopUps/ChangeNoteLang";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-git";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-java";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-typescript";

import { AppProvider } from "../../AppContext";
import NoteLanguage from "../button/NoteLanguage";
import NoteSuggestion from "../note-display/NoteSuggestion";

const Editor = (props) => {
  let deleteBtn = useRef();
  let saveBtn = useRef();
  let noteContent = useRef();
  const curr = useContext(AppProvider);
  if (document.querySelector(".textarea") !== null) {
    document.querySelector(".textarea").value = props.noteDetail;
  }

  setTimeout(() => {
    Prism.highlightAll();
  }, 1000);

  let note = useRef();
  let result = useRef();
  let pre = useRef();

  const factorLangView = (lang) => {
    //this is the language the user sees
    lang = lang === undefined ? undefined : lang.toLowerCase();

    if (lang === undefined) {
      return factorLangView(curr.currentLanguage);
    } else if (
      lang.slice(-2) === "js" ||
      lang === "react native" ||
      lang === "javascript" ||
      lang === "js"
    ) {
      return "javascript";
    } else if (lang === "csharp" || lang === "c#") {
      return "c#";
    } else if (lang === "cpp" || lang === "c++") {
      return "c++";
    } else if (lang === "py" || lang === "python") {
      return "python";
    } else if (lang === "java") {
      return "java";
    } else {
      return "python";
    }
  };
  const factorLangHTML = (lang) => {
    //this is the language in the background for prismJS
    lang = lang === undefined ? undefined : lang.toLowerCase();
    lang = factorLangView(lang);

    if (lang === "javascript") {
      return "javascript";
    } else if (lang === "c#") {
      return "csharp";
    } else if (lang === "c++") {
      return "cpp";
    } else if (lang === "python") {
      return "python";
    }
    if (lang === "java") {
      return "java";
    }
  };

  let noteLanguage = factorLangHTML(curr.currentNote.noteLanguage);

  const changeLang = (lang) => {
    setL(lang);
    props.onChangeNoteLanguage(lang, getNotes());
    setTimeout(() => {
      document.querySelector(`.selected`).click();
    }, 500);
  };

  const [l, setL] = useState(factorLangView(curr.currentNote.noteLanguage));

  const deleteImg = (imgSource) => {
    let notes = document.querySelectorAll(".detail");
    notes.forEach((n, index) => {
      if (n.className === "img detail") {
        if (notes[index + 1].value.length === 0) {
          // if the textbox after the image is empty delete it also
          noteD.splice(index, 2);
        } else {
          noteD.splice(index, 1);
        }
        setNoteD([...noteD]);

        //TODO: get the index
        //      check to see if the next text box is empty, if yes then delete both (document.querySelectorAll(".detail"))
        //      else delete only the image
      }
    });
    //get the index of the img to be delete
  };
  const editImg = () => {};

  let original = []; //this is after the schema change
  if (
    curr.currentNote.noteDetail === 1 &&
    typeof curr.currentNote.noteDetail[0] !== "object"
  ) {
    //if it is just a string
    original.push({ text: curr.currentNote.noteDetail[0] });
    //for the case where noteDetail: ["A string only inside"]
  }
  else if (curr.currentNote.noteDetail.length === 1 &&
    typeof curr.currentNote.noteDetail[0] === "string") {
    original.push({ text: curr.currentNote.noteDetail[0] })
  }
  else {
    curr.currentNote.noteDetail.forEach((n) => {
      original.push(n);

    });
  }
  const moveComponentHandler = (text) => { //move the component's position up withing the array 
    console.log(noteD)
    let index;
    noteD.forEach((note, i) => {
      console.log(props.note)
      // console.log(note.props.codeText === text)
      // if (note.props.codeText === text && i !== 0) {
      //   index = i;
      //   let temp = noteD;
      //   [temp[i], temp[i + 1]] = [temp[i + 1], temp[i]]
      //   setNoteD(prev=>temp)
      // }
    })
  }



  
  let initialArray = [];
  
  const fixFormat = (note) => { // note should be in the format note = [""] or [{}]
    let temp = []
    note.forEach((x) => {
      if (Object.keys(x)[0] === "text") {
        temp.push(
          <NoteText codeText={x.text.replace(/&gt;/gi, ">").replace(/&lt;(?! )/gi, "< ").replace(/&amp;/gi, "&").replace(/</gi, "<")} key={Math.random()}language={l} moveUp={ moveComponentHandler}>
            {" "}
          </NoteText>
        );
      }
      else if (typeof x === 'string') {
        temp.push(
          <NoteText codeText={x.replace(/&gt;/gi, ">").replace(/&lt;(?! )/gi, "< ").replace(/&amp;/gi, "&").replace(/</gi, "<")} key={Math.random()} language={l} moveUp={ moveComponentHandler}>
            {" "}
          </NoteText>
        );
       }
       else {
        //then it is an image
        temp.push(
          <NoteImage
            imageData={x.img}
            onDelete={deleteImg}
            onEdit={editImg}
            key={Math.random()}
          >
            {" "}
          </NoteImage>
        );
      }
    });
    return temp;
  }
  initialArray = fixFormat(original);

  // .replace(/&gt;/gi, ">").replace(/&lt;(?! )/gi, "< ").replace(/&amp;/gi, "&").replace(/</gi, "<");

  const [noteD, setNoteD] = useState(initialArray);

  const changeNote = () => {
    setNoteD(fixFormat(curr.currentNote.noteDetail))
  }
  

  const file = useRef();
  const addImage = () => {
    const reader = new FileReader();
    let uploadedImage = "";
    reader.onload = (evt) => {
      uploadedImage = reader.result;
      setNoteD((prev) => [
        ...prev,
        <NoteImage
          imageData={uploadedImage}
          onDelete={deleteImg}
          onEdit={editImg}
          key={Math.random()}
        ></NoteImage>,
        <NoteText codeText={""} key={Math.random()} language={l}></NoteText>,
      ]);
    };
    reader.readAsDataURL(file.current.files[0]);
  };

  const pressNote = (notes) => {
    //to be called when a note is clicked from the note suggestion section
    setNoteD(notes);
  };
  const getNotes = () => {
    let d = [];
    document.querySelectorAll(".detail").forEach((n) => {
      if (n.type === "textarea") {
        d.push({ text: n.value });
      } else {
        d.push({ img: n.src });
      }
    });
    return d;
  };

  return (
    <div className="code-section">
      <div className="visual-section">
        <div className="code" ref={noteContent}>
          <NoteLanguage noteLanguage={l} changeLanguage={changeLang} />
          {noteD.map((note) => {
            return note;
          })}
        </div>
        <div className="note-btns">
          <button
            className="btn-note delete"
            ref={deleteBtn}
            onClick={() => props.onDelete(getNotes())}
          >
            Delete
          </button>

          <input
            type="file"
            // className="btn-note"
            onChange={addImage}
            ref={file}
          ></input>
          <button
            className="btn-note save"
            ref={saveBtn}
            onClick={() => props.onSave(getNotes())}
            // onClick={() => props.onSave(note.current.value)}
          >
            Save
          </button>
        </div>
      </div>

      {/* <NoteSuggestion notes={curr.currentNotes} onChange={ changeNote} /> */}
    </div>
  );
};

export default Editor;
