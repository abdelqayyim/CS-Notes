import React, {useState} from 'react';
import './App.css';
import Background from './components/Background';
import LanguagesBox from './components/buttons-box/LanguagesBox';
import NoteDisplay from './components/note-display/NoteDisplay';

import AppContext from './AppContext';

//TODO: add a class 'move-up' to Background when a language is clicked
//TASK: add move-up class when button is clicked
//TASK: Add SVG spinner while loading the languages
function App() {
  const [move, setMove] = useState(false);

  const moveUp = () => {//this shift the title and language up when a language is pressed
    setMove(true);
  }

  return (
    <AppContext>
      <Background className={move === true ? 'background move-up' : 'background'}>
        <p className='my-cs-notes'>My CS Notes</p>
        <LanguagesBox moveUp={moveUp} />
        <NoteDisplay/>
      </Background>
    </AppContext>
    
  );
}

// TASK: ading and removing language
// TASK: adding and removing note
// TASK: editing title and description and code
// TASK: code section
export default App;
