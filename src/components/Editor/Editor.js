import React, { useRef, useState, useContext, useEffect} from "react";
import Prism from "prismjs";
import "../Themes/prism.css";
import "./Editor.css";
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
const Editor = (props) => {
  let deleteBtn = useRef();
  let saveBtn = useRef();
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

 

  let noteLanguage = curr.currentLanguage;
  if (
    curr.currentLanguage.slice(-2) === "js" ||
    curr.currentLanguage === "react native"
  ) {
    //should create a function for this
    noteLanguage = "javascript";
  } else if (curr.currentLanguage === "csharp") {
    //should create a function for this
    noteLanguage = "cs";
  }

  const changeLang = (lang)=>{
    // console.log(curr.currentNote)
    console.log(lang)
    props.onChangeNoteLanguage(lang)
  }



  const factorLang = (lang) => {
    if (lang === undefined) {
      return curr.currentLanguage
    }
  }

  const syncScroll = (element) => {
    let res = pre.current;
    res.scrollTop = element.scrollTop;
    res.scrollLeft = element.scrollLeft;
  };
  const checkTab = (element, e) => {
    let code = element.value;
    if (e.key === "Tab") {
      /* Tab key pressed */
      e.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value); // Update text to include indent
    }
  };
  const update = (text) => {
    let result_element = result.current;
    // Handle final newlines (see article)
    if (text[text.length - 1] === "\n") {
      // If the last character is a newline character
      text += " "; // Add a placeholder space character to the final line
    }
    // Update code
    result_element.innerHTML = text
      .replace(new RegExp("&", "g"), "&")
      .replace(new RegExp("<", "g"), "<"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
    original = text;
  };
  let original = props.noteDetail.replace(/&gt;/gi, ">").replace(/&lt;(?! )/gi, "< ").replace(/&amp;/gi, "&").replace(/</gi, "<");
  // let original = props.noteDetail.replace(/&gt;/gi, "> ").replace(/&lt;/gi, "<").replace(/&amp;/gi, "& ").replace(/</gi, "< ");
  // fixText(props.noteDetail)

  return (
    <div className="code-section">
      <div className="code">
        <NoteLanguage noteLanguage={noteLanguage} changeLanguage={ changeLang}/>

        

        <textarea
          spellCheck={false}
          ref={note}
          onInput={() => {
            update(note.current.value);
            syncScroll(note.current);
          }}
          onScroll={() => syncScroll(note.current)}
          onKeyDown={(e) => checkTab(note.current, e)}
          className="textarea"
        >
          {props.noteDetail}
        </textarea>


        <pre className={`language-${factorLang(curr.currentNote.noteLanguage)} script`} ref={pre}>
          <code ref={result} className="highlight">
            {props.noteDetail.replace(/&gt;/gi, "> ").replace(/&lt;/gi, "< ").replace(/&lt/gi, "< ").replace(/&amp;/gi, "& ")}
          </code>
        </pre>


      </div>

      <div className="note-btns">
        <button
          className="btn-note delete"
          ref={deleteBtn}
          onClick={() => props.onDelete(note.current.value)}
        >
          Delete
        </button>
        <button
          className="btn-note save"
          ref={saveBtn}
          onClick={() => props.onSave(note.current.value)}
        >
          Save
        </button>
      </div>
      
    </div>
  );
};

export default Editor;
