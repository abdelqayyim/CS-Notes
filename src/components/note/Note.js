import React, {useContext} from 'react'; 
import './Note.css';
import { ACTIONS,AppProvider } from '../../AppContext';

const Note = (props) => {
    const curr = useContext(AppProvider);
    const noteHandler = () => {
        curr.callDispatch({ type: ACTIONS.CHANGE_CURRENT_NOTE, payload: { title: props.title, description: props.description, detail: props.noteDetail, id: props.noteId } })
    }
    return (
        <div className={`note-info ${curr.currentAppMode}`} onClick={noteHandler}>
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
export default Note;