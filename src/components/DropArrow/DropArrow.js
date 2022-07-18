import React, {useState, Fragment, useContext} from 'react'; 
import './DropArrow.css';
import { AppProvider } from '../../AppContext';

const DropArrow = (props) => {
    const curr = useContext(AppProvider);
    const [clicked, setClicked] = useState(false);

    const addLanguageHandler = () => {
        setClicked(false);//close the dropdown
        curr.addLanguageClick();
    }
    const deleteLanguageHandler = () => {
        setClicked(false);//close the dropdown
        curr.deleteLanguageClick();
    }
    const arrowClickHandler = () => {
        curr.toggleDropMenu();
    }
    
    return (
        <Fragment>
            <div className="btn-dropdown">
                <button className='arrowBtn' onClick={arrowClickHandler}><i className={curr.menuActive? "fa-solid fa-angle-up":"fa-solid fa-angle-down"}></i> </button>
                <ul className={curr.menuActive? "dropInfo active":"dropInfo"}>
                    <li className="add-languageOption" onClick={addLanguageHandler}>Add Language</li>
                    <li className="delete-languagegOption" onClick={deleteLanguageHandler}>Delete Language</li>
                </ul>
            </div>
        </Fragment>
        
    )
};

export default DropArrow;