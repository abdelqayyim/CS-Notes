import React, {Fragment, useContext} from 'react'; 
import './DropArrow.css';
import { ACTIONS, AppProvider } from '../../AppContext';

const DropArrow = (props) => {
    const curr = useContext(AppProvider);
    const addLanguageHandler = () => {
        curr.callDispatch({type: ACTIONS.TOGGLE_ADD_LANGUAGE_POPUP})
    }
    const deleteLanguageHandler = () => {
        curr.callDispatch({type: ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP})
    }
    const arrowClickHandler = () => {
        curr.callDispatch({type: ACTIONS.TOGGLE_MENU, payload:{mode: !curr.activeDropMenu}})
    }
    
    return (
        <Fragment>
            <div className="btn-dropdown">
                <button className='arrowBtn' onClick={arrowClickHandler}><i className={curr.activeDropMenu? "fa-solid fa-angle-up":"fa-solid fa-angle-down"}></i> </button>
                <ul className={curr.activeDropMenu? "dropInfo active":"dropInfo"}>
                    <li className="add-languageOption" onClick={addLanguageHandler}>Add Language</li>
                    <li className="delete-languagegOption" onClick={deleteLanguageHandler}>Delete Language</li>
                </ul>
            </div>
        </Fragment>
        
    )
};

export default DropArrow;