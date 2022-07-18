import React, {useEffect, useContext} from 'react'; 
import './LanguagesBox.css';

import LanguageButton from '../button/LanguageButton';
import DropArrow from '../DropArrow/DropArrow';
import { AppProvider } from '../../AppContext';
import AddNoteBtn from '../note/AddNoteBtn';

const LanguagesBox = (props) => {
    const curr = useContext(AppProvider);
    
    useEffect(() => {
        curr.updateMessage("Loading Data");
        curr.fetchLanguages();
    }, [curr.fetchLanguages])

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
                { curr.currLanguages.map(language => {
                    return <LanguageButton name={titleCase(language.name)} key={language._id} moveUp={props.moveUp} />
                })}
                <DropArrow/>
            </div>
            
            {curr.languageClicked  && !curr.noteClicked && <AddNoteBtn/>}
        </div>
    )
};

export default LanguagesBox;