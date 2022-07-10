import React from 'react'; 
import './Note.css';

const Note = (props)=>{


    return (
        <div className='note-info'>
            <div className='note-title'>
            {props.title}
            </div>
            <div className='note-description'>
                {props.description}
            </div>
        </div>
    )
};

export default Note;