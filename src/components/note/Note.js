import React, {useContext} from 'react'; 
import './Note.css';

import { AppProvider } from '../../AppContext';

const Note = (props)=>{
    const curr = useContext(AppProvider);

    const noteClickHandler = () => {
        console.log(`Note with title:${props.title} and description: ${props.description}`);
        curr.clickNote(props);
    }

    return (
        <div className='note-info' onClick={noteClickHandler}>
            <div className='note-title'>
                {props.title}
            </div>
            <div className='note-description'>
                {props.description}
            </div>
        </div>
    )
};

//TASK: When view notes, make sure to scroll back up when a note is pressed
export default Note;