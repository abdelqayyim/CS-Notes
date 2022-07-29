import React, {useState, useCallback, useRef, useContext} from 'react'; 
import './DeleteLanguagePopUp.css';
import { ACTIONS,AppProvider } from '../../AppContext';
import ReactDOM from 'react-dom';

const DeleteLanguagePopUp = (props) => {
    const curr = useContext(AppProvider);
    const inputName = useRef();
   
    let overlay = useRef();
    const [overlayClicked, setOverlayClicked ] = useState(false);

    const overlayHandler = () => {
        curr.callDispatch({ type: ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP });
    }
    const deleteLanguage = () => {
        let input = inputName.current.value.trim();
        if (input.length === 0) {
            curr.callDispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'negative',message: `Input Field Cannot be Empty`}})
            setTimeout(() => { 
                curr.callDispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: `Input Field Cannot be Empty`}})
            },2000)
            return
        }
        curr.deleteLanguage(input);
    }
    const deleteLang = useCallback(async () => {
        let input = inputName.current.value.trim();
        
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.updateMessage('Adding Language')
        const response = await fetch(` https://frequentquestions.herokuapp.com/languages/${input.toLowerCase()}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const data = await response;
        curr.hideSpinner();

        if (response.ok) {
            curr.manageBottomMessage(true, "positive", `${input} was Successfully Deleted`);
            overlay.current.click();
            setTimeout(() => { 
                curr.manageBottomMessage(false, "positive", `${input} was Successfully Deleted`);
            }, 2000)
            curr.updateMessage("Updating");
            console.log(curr);
            curr.fetchLanguages();
        }
        else {
            console.log(response);
            curr.manageBottomMessage(true, "negative", `${input} Does Not Exists`);
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", `${input} Does Not Exists`);
            },2000)
        }
    }, [])
    const enterKeyPress = (key) => {
        console.log(key.code === "Enter")
        if (key.code === "Enter") {
            deleteLanguage();
        }
    }

    return (
        ReactDOM.createPortal(
            <div className='delete-overlay-container' onKeyPress={enterKeyPress}>
                <div className={overlayClicked? "delete-overlay": "delete-overlay active" } ref={overlay} onClick={overlayHandler}></div>
                <div className={overlayClicked? "deletelanguage-popup": "deletelanguage-popup active" }>
                    <input placeholder='Name' className='newLang-input' ref={inputName}></input>
                    <button className='delete-btn' onClick={deleteLanguage}>Delete</button>
                </div>
            </div>
            ,
            document.querySelector('.overlay'))
    )
};

export default DeleteLanguagePopUp;