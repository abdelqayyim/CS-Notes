import React, { useRef, useState, useEffect } from "react";
import Prism from "prismjs";
import "../Themes/prism.css";
import "./Editor.css";
import ChangeNoteLang from "../PopUps/ChangeNoteLang";
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';

const Editor = (props) => {
  setTimeout(() => {
    Prism.highlightAll();
  },1000)
    let note = useRef();
    let result = useRef();
  let pre = useRef();

  const [showPop, setShowPop] = useState(false);
  const [lang, setLang] = useState(props.currentLanguage);

  const changeLang = () => {
        setShowPop(prev=>!prev);
  }
  const changeNoteLang = (newLang) => {
    setLang(newLang);
    // Prism.highlightAll();
    // Prism.highlight(result.current);
  }
    const syncScroll = (element) => {
        let res = pre.current;
        res.scrollTop = element.scrollTop;
        res.scrollLeft = element.scrollLeft;
    }
    const checkTab = (element, e)=> {
        let code = element.value;
        if(e.key === "Tab") {
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
    }
    const update = (text)=>{
        let result_element = result.current;
        // Handle final newlines (see article)
        if(text[text.length-1] === "\n") { // If the last character is a newline character
            text += " "; // Add a placeholder space character to the final line 
        }
        // Update code
        result_element.innerHTML = text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"); /* Global RegExp */
        // Syntax Highlight
        Prism.highlightElement(result_element);
    }
  useEffect(() => { }, [lang]);
  console.log("Rendered");
  console.log(`Language is ${lang}`);
  return (
    <div className="code">
      <div className="note-lang" onClick={changeLang}>{lang }</div>

      {showPop && <ChangeNoteLang closePop={changeLang} changeNoteLanguage={changeNoteLang}/>}
    

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
      ></textarea>
      <pre className={`language-${lang} script`} ref={pre}>
        <code ref={result} className="highlight">
        </code>
      </pre>
    </div>
  );
};

export default Editor;
