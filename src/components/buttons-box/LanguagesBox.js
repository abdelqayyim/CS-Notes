import React, {useState, useCallback, useEffect} from 'react'; 
import './LanguagesBox.css';

import LanguageButton from '../button/LanguageButton';

import Message from '../message-popup/Message';

const LanguagesBox = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [languages, setLanguages] = useState([]);
    

    const fetchLanguagesHandler = useCallback(async () => {
        setIsLoading(true); // change the state when you start to load
        const response = await fetch('https://frequentquestions.herokuapp.com/languages/')
        const data = await response.json();
        
        // for (let lang of data) {
        //    languages.push(lang.name);
        // }
        setLanguages(data.reverse())
        
        setIsLoading(false); // after loading the data
        console.log(languages);
    }, [])
    
    useEffect(() => {
        fetchLanguagesHandler();
    }, [fetchLanguagesHandler])
    console.log(languages);



    return (
        <div className='languages-box'>
            {isLoading && <Message message={ 'Loading Data'} />}
            {languages.length === 0 && !isLoading && <p>No languages</p>}
            
            {languages.map(language => {
                return <LanguageButton name={language.name} key={language._id} moveUp={props.moveUp} />
            })}
        </div>
    )
};

export default LanguagesBox;