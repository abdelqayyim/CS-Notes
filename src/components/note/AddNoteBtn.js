import React, {useContext} from 'react'; 
import './AddNoteBtn.css';
import { ACTIONS, AppProvider } from '../../AppContext';

const AddNoteBtn = (props) => {
    const curr = useContext(AppProvider);
    const handleAddNote = () => {
        curr.callDispatch({type: ACTIONS.TOGGLE_ADD_NOTE_POPUP})
    }
    return (
        <div className="add-noteBtn" onClick={handleAddNote}>Add Note</div>
    )
};

export default AddNoteBtn;