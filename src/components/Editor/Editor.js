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

  const factorLangView = (lang) => { //this is the language the user sees
    lang = lang === undefined? undefined: lang.toLowerCase();

    if (lang === undefined) {
      return factorLangView(curr.currentLanguage)
    }
    else if (lang.slice(-2) === 'js'|| lang === 'react native' || lang === 'javascript' || lang === 'js') {
      return "javascript";
    }
    else if (lang === "csharp" || lang === 'c#') {
      return "c#"
    }
    else if (lang === "cpp" || lang === 'c++') {
      return "c++"
    }
    else if (lang === "py" || lang === 'python') {
      return "python"
    }
    else if (lang === "java") {
      return "java"
    }
    else{
      return "python"
    }
  }
  const factorLangHTML = (lang) => { //this is the language in the background for prismJS
    lang = lang === undefined? undefined: lang.toLowerCase();
    lang = factorLangView(lang);
    
    if (lang === 'javascript') {
      return "javascript";
    }
    else if (lang === 'c#') {
      return 'csharp'
    }
    else if (lang === 'c++') {
      return 'cpp'
    }
    else if (lang === 'python') {
      return "python"
    }
    if (lang === "java") {
      return "java"
    }
  }

 

  let noteLanguage = factorLangHTML(curr.currentNote.noteLanguage);


  const changeLang = (lang)=>{
    setL(lang);
    props.onChangeNoteLanguage(lang, note.current.value)
    setTimeout(()=>{document.querySelector(`.selected`).click()},500)
  }


  const [l, setL] = useState(factorLangView(curr.currentNote.noteLanguage));

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
        <NoteLanguage noteLanguage={l} changeLanguage={ changeLang}/>

        

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


        <pre className={`language-${noteLanguage} script`} ref={pre}>
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
