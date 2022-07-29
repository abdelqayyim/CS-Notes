import React, {useState, useContext, useRef, useCallback} from 'react'; 
import './AddLanguagePopUp.css';
import  ReactDOM  from 'react-dom';
import { ACTIONS,AppProvider } from '../../AppContext';


const AddLanguagePopUp = (props)=>{
    const curr = useContext(AppProvider);
    const inputName = useRef();
    let overlay = useRef();
    const [overlayClicked, setOverlayClicked ] = useState(false);

    const overlayHandler = () => {
        curr.callDispatch({type: ACTIONS.TOGGLE_ADD_LANGUAGE_POPUP})
    }
    const addNewLanguage = () => {
        let input = inputName.current.value.trim();
        if (input.length === 0) {
            curr.callDispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'negative',message: `Input Field Cannot be Empty`}})
            setTimeout(() => { 
                curr.callDispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: `Input Field Cannot be Empty`}})
            },2000)
            return

        }
        curr.addLanguage(input.toLowerCase());
    }
    const enterKeyPress = (key) => {
        console.log(key.code === "Enter")
        if (key.code === "Enter") {
            addNewLanguage();
        }
    }

    return (
        ReactDOM.createPortal(
            <div className='overlay-container' onKeyPress={enterKeyPress}>
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