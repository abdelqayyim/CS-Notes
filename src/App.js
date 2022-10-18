import React, {useState} from 'react';
import './App.css';
import Background from './components/Background';
import LanguagesBox from './components/LanguagesBox/LanguagesBox';
import NoteDisplay from './components/note-display/NoteDisplay';
import Prism from 'prismjs';

import AppContext from './AppContext';
import ToggleMode from './components/ToggleMode/ToggleMode';

//TODO: add a class 'move-up' to Background when a language is clicked
//TASK: add move-up class when button is clicked
//TASK: Add SVG spinner while loading the languages
function App() {
  const userCurrentTime = new Date().getHours();
  let mode = 'dark';
  // let mode = (userCurrentTime >= 18 || userCurrentTime <= 8) ? 'dark' : 'light';
  const [move, setMove] = useState(false);

  const moveUp = () => {//this shift the title and language up when a language is pressed
    setMove(true);
  }
  const toggleMode = () => {
    document.querySelector('.my-cs-notes').classList.toggle('dark');
  }
  return (
    <AppContext>
      <Background className={move === true ? 'background move-up' : 'background'}>
        <p className={ `my-cs-notes ${mode}`} onClick={()=> window.location.reload()}>My CS Notes</p>
        <LanguagesBox moveUp={moveUp} />
        <NoteDisplay/>
      </Background>
      {/* <ToggleMode toggleMode={ toggleMode} /> */}
    </AppContext>
    
  );
}

// TASK: page transitions maybe/
export default App;

// TODO: 
// 1 - create two new components, one for the text note and one for note Image

