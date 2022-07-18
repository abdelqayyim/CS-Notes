import React, {useState, useRef, useContext, useCallback} from 'react'; 
import './AddNotePopUp.css';
import ReactDOM from 'react-dom';
import { AppProvider } from '../../AppContext';

const AddNotePopUp = (props) => {
    const curr = useContext(AppProvider);
    const [overlayClicked, setOverlayClicked] = useState(false);
    let overlay = useRef();
    let newTitle = useRef();
    let newDescription = useRef();
    const overlayHandler = () => {
        curr.toggleAddNoteClick();
    }
    const addNewNoteHandler = () => {
        let title = newTitle.current.value.trim();
        let description = newDescription.current.value.trim();
        if (title.length === 0) {
            curr.manageBottomMessage(true, "negative", "Title Cannot be Blank");
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", "Title Cannot be Blank");
            },2000)
            return
        }
        addNote();
    }
    const addNote = useCallback(async () => {
        let title = newTitle.current.value.trim().toLowerCase();
        let description = newDescription.current.value.trim().toLowerCase();
        let language = curr.currLanguage.toLowerCase();
        if(description.length === 0){
            description = "";
        }
        let newNote = {
            "title": title,
            "description": description,
            "noteDetail": "",
            "_id": 0
        }
        console.log(newNote);

        
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.updateMessage('Adding Note')
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/newNote`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
        const data = await response;
        curr.hideSpinner();

        if (response.ok) {
            curr.fetchNotes(language);
            curr.manageBottomMessage(true, "positive", `Note was Successfully Added`);
            overlay.current.click();
            setTimeout(() => { 
                curr.manageBottomMessage(false, "positive", `Note was Successfully Added`);
            }, 2000)
            curr.updateMessage("Updating");
            console.log(curr);
            curr.fetchLanguages();
        }
        else {
            curr.manageBottomMessage(true, "negative", `Note with that title Already Exists`);
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", `Note with that title Already Exists`);
            },2000)
        }
        
    }, [])

    return (
        ReactDOM.createPortal(
            <div className='newNote-container'>
                <div className={overlayClicked? "overlay": "overlay active" } ref={overlay} onClick={overlayHandler}></div>
                <div className={overlayClicked? "newNote-popup": "newNote-popup active" }>
                    <input placeholder='Title' className='newNote-title' ref={newTitle}></input>
                    {/* <input placeholder='Description' className='newNote-description'></input> */}
                    <textarea className='newNote-description' placeholder='Description' ref={newDescription}></textarea>
                    <button className='newNote-btn' onClick={addNewNoteHandler}>ADD</button>
                </div>
            </div>
            ,
            document.querySelector('.overlay'))
    )
};

export default AddNotePopUp;