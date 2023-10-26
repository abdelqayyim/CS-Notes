import React, {useState} from 'react';
import './_app.css';
import Background from '../src/components/Background';
import LanguagesBox from '../src/components/LanguagesBox/LanguagesBox';
import NoteDisplay from '../src/components/note-display/NoteDisplay';
import Prism from 'prismjs';

import AppContext from '../src/AppContext';
import ToggleMode from '../src/components/ToggleMode/ToggleMode';

//TODO: add a class 'move-up' to Background when a language is clicked
//TASK: add move-up class when button is clicked
//TASK: Add SVG spinner while loading the languages
function App() {
  const userCurrentTime = new Date().getHours();
  const [move, setMove] = useState(false);

  const moveUp = () => {//this shift the title and language up when a language is pressed
    setMove(true);
  }
  
  return (
    <AppContext>
      <Background move={move} moveUp={moveUp}>
        <p className={ `my-cs-notes`} onClick={()=> window.location.reload()}>My CS Notes</p>
        <LanguagesBox moveUp={moveUp} />
        <NoteDisplay/>
      </Background>
      {/* <ToggleMode toggleMode={ toggleMode} /> */}
      <div className="overlay"></div>
    </AppContext>
    
  );
}

// TASK: page transitions maybe/
export default App;

// TODO: 
// 1 - create two new components, one for the text note and one for note Image

