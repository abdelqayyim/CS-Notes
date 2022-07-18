import React, {useContext} from 'react'; 
import './AddNoteBtn.css';
import { AppProvider } from '../../AppContext';

const AddNoteBtn = (props) => {
    const curr = useContext(AppProvider);

    const handleAddNote = () => {
        curr.closeDropMenu();
    }
    return (
        <div className="add-noteBtn" onClick={handleAddNote}>Add Note</div>
    )
};

export default AddNoteBtn;