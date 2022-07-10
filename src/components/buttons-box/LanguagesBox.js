import React, {useState, useCallback, useEffect, useContext} from 'react'; 
import './LanguagesBox.css';

import LanguageButton from '../button/LanguageButton';

import Message from '../message-popup/Message';
import { AppProvider } from '../../AppContext';

const LanguagesBox = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [languages, setLanguages] = useState([]);
    
    const curr = useContext(AppProvider);

    const fetchLanguagesHandler = useCallback(async () => {
        curr.showSpinner(); //equivalent to setting isLoading to true
        curr.updateMessage('Loading Data')
        const response = await fetch('https://frequentquestions.herokuapp.com/languages/')
        const data = await response.json();
        
        setLanguages(data.reverse())
        
        curr.hideSpinner();
        curr.updateMessage(null)
    }, [])
    
    useEffect(() => {
        fetchLanguagesHandler();
    }, [fetchLanguagesHandler])



    return (
        <div className='languages-box'>
            {languages.map(language => {
                return <LanguageButton name={language.name} key={language._id} moveUp={props.moveUp} />
            })}
        </div>
    )
};

export default LanguagesBox;