import React, {useEffect, useCallback, useState} from 'react'; 
import './LanguageButton.css';

const LanguageButton = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    

    const fetchNotes = useCallback(async (language) => {
        setIsLoading(true); // change the state when you start to load
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/getNotes`)
        const data = await response.json();
        
        setNotes(data.reverse())
        
        setIsLoading(false); // after loading the data
        console.log(data);
    }, [])
    
    useEffect(() => {
        fetchNotes(props.name);
    }, [fetchNotes])
    console.log(notes);


    return (
        <button className='btn' onClick={() => {
            props.moveUp();
            fetchNotes(props.name);
        }} name={props.name} id={props._id}>
            {props.name}
        </button>
    )
};

export default LanguageButton;