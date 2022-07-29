import React, {useContext} from 'react'; 
import './Note.css';

import { ACTIONS,AppProvider } from '../../AppContext';

const Note = (props)=>{
    const curr = useContext(AppProvider);
    const noteHandler = () => {
        curr.callDispatch({ type: ACTIONS.CHANGE_CURRENT_NOTE, payload: { title: props.title, description:props.description, detail:props.noteDetail, id:props.noteId } })
        // curr.clickNote(props);
    }
    return (
        <div className='note-info' onClick={noteHandler}>
            <div className='note-title'>
                {props.title}
            </div>
            <center><hr></hr></center>
            <div className='note-description'>
                {props.description}
            </div>
        </div>
    )
};

//TASK: When view notes, make sure to scroll back up when a note is pressed
export default Note;