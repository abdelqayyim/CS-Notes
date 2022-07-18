import React, {useState, useContext, useRef, useCallback} from 'react'; 
import './AddLanguagePopUp.css';
import  ReactDOM  from 'react-dom';
import { AppProvider } from '../../AppContext';

const AddLanguagePopUp = (props)=>{
    const curr = useContext(AppProvider);
    const inputName = useRef();
    let overlay = useRef();
    const [overlayClicked, setOverlayClicked ] = useState(false);

    const overlayHandler = () => {
        curr.addLanguageClick();
    }
    const addNewLanguage = () => {
        let input = inputName.current.value.trim();
        if (input.length === 0) {
            curr.manageBottomMessage(true, "negative", "Input Cannot be Blank");
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", "Input Cannot be Blank");
            },2000)
            return

        }
        addLang();
    }
    const addLang = useCallback(async () => {
        let input = inputName.current.value.trim().toLowerCase();
        
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.updateMessage('Adding Language')
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${input}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const data = await response;
        curr.hideSpinner();

        if (response.ok) {
            curr.manageBottomMessage(true, "positive", `${input} was Successfully Added`);
            overlay.current.click();
            setTimeout(() => { 
                curr.manageBottomMessage(false, "positive", `${input} was Successfully Added`);
            }, 2000)
            curr.updateMessage("Updating");
            console.log(curr);
            curr.fetchLanguages();
        }
        else {
            curr.manageBottomMessage(true, "negative", `${input} Already Exists`);
            setTimeout(() => { 
                curr.manageBottomMessage(false, "negative", `${input} Already Exists`);
            },2000)
        }
    }, [])

    return (
        ReactDOM.createPortal(
            <div className='overlay-container'>
                <div className={overlayClicked? "overlay": "overlay active" } ref={overlay} onClick={overlayHandler}></div>
                <div className={overlayClicked? "addlanguage-popup": "addlanguage-popup active" }>
                    <input placeholder='Name' className='newLang-input' ref={inputName}></input>
                    <button className='add-btn' onClick={addNewLanguage}>ADD</button>
                </div>
            </div>
            ,
            document.querySelector('.overlay'))
    )
};

export default AddLanguagePopUp;