import React, {useState, useRef} from 'react'; 
import ReactDOM from 'react-dom';
import './ChangeNoteLang.css';

const ChangeNoteLang = (props) => {
    let noteLang = useRef();
    const clickHandler = () => {
        console.log(noteLang.current.value);
        if (noteLang.current.value.length !== 0) {
            props.changeNoteLanguage(noteLang.current.value);
            props.closePop();
        }
    }
    return (

        ReactDOM.createPortal(
        <div className='parent-div'>
            <div className='over' onClick={props.closePop}></div>
            <div className='change-pop'>
                <input className='newLang-input' ref={noteLang}></input>
                <button className='newLang-btn' onClick={clickHandler}>Change</button>
            </div>  
        </div>
        ,
        document.querySelector('.overlay'))
    )
};

export default ChangeNoteLang;