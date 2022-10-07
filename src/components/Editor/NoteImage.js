import React from 'react'; 
import './NoteImage.css';

const NoteImage = (props) => {
    const editImg = () => {
        console.log(props)
        props.onEdit(props.imageData)
    }
    const deleteImg = () => {
        props.onDelete(props.imageData)
    }
    return (
        <div className='img-container'>
            <div className='delete-imgBtn imgBtn' onClick={deleteImg}>Delete</div>
            <div className='edit-imgBtn imgBtn' onClick={editImg}>Edit</div>
            <img className="img detail" type="image" src={props.imageData} alt=""></img>
        </div>
    )
};
// TODO: add delete button
export default NoteImage;