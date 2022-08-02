import React, {useEffect, useContext} from 'react'; 
import './LanguagesBox.css';

import LanguageButton from '../button/LanguageButton';
import DropArrow from '../DropArrow/DropArrow';
import { AppProvider, ACTIONS } from '../../AppContext';
import AddNoteBtn from '../note/AddNoteBtn';

const LanguagesBox = (props) => {
    const curr = useContext(AppProvider);
    
    useEffect(() => {
        curr.fetchLanguages();
    }, [])

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
    }

    return (
        <div className='top-div'>
            <div className='languages-box'>
                { curr.currentLanguages.map(language => {
                    return <LanguageButton name={titleCase(language.name)} key={language._id} moveUp={props.moveUp} />
                })}
                <DropArrow/>
            </div>
            {curr.currentLanguage !== undefined  && curr.currentNote.noteTitle === undefined && <AddNoteBtn/>}
        </div>
    )
};

export default LanguagesBox;