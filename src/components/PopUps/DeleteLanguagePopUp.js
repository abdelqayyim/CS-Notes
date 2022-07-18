import React, {useState, useCallback, useRef, useContext} from 'react'; 
import './DeleteLanguagePopUp.css';
import { AppProvider } from '../../AppContext';
import ReactDOM from 'react-dom';

const DeleteLanguagePopUp = (props) => {
    const curr = useContext(AppProvider);
    const inputName = useRef();
   
    let overlay = useRef();
    const [overlayClicked, setOverlayClicked ] = useState(false);

    const overlayHandler = () => {
        curr.deleteLanguageClick();
    }
    const deleteLanguage = () => {
        let input = inputName.current.value.trim();
        if (input.length === 0) {
            curr.manageBottomMessage(true, "negative", "Input Cannot be Blank");
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", "Input Cannot be Blank");
            },2000)
            return

        }
        deleteLang();
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

    return (
        ReactDOM.createPortal(
            <div className='delete-overlay-container'>
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