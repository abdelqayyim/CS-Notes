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
    const arrowClickHandler = (e) => {
        curr.toggleMenu('toggle')
    }
    
    
    return (
        <Fragment>
            <div className={`btn-dropdown ${curr.currentAppMode}`}>
                <button className={`arrowBtn ${curr.currentAppMode}`} onClick={(e)=>arrowClickHandler(e)}><i className="fas fa-solid fa-angle-down arrow"></i> </button>
                <ul className={curr.activeDropMenu? `dropInfo active ${curr.currentAppMode}`:`dropInfo ${curr.currentAppMode}`}>
                    <li className="add-languageOption" onClick={addLanguageHandler}>Add Language</li>
                    <li className="delete-languagegOption" onClick={deleteLanguageHandler}>Delete Language</li>
                </ul>
            </div>
        </Fragment>
        
    )
};

export default DropArrow;