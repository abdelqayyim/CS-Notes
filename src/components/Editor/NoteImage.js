import React, { useRef, useState } from "react";
import "./NoteImage.css";

const NoteImage = (props) => {
  const editImg = () => {
    console.log(props);
    props.onEdit(props.imageData);
  };
  const deleteImg = () => {
    props.onDelete(props.imageData);
  };
    
const [currentImg, setCurrentImg] = useState(props.imageData)
  const file = useRef();
  const changeImage = () => {
    const reader = new FileReader();
    let uploadedImage = "";
    reader.onload = (evt) => {
      uploadedImage = reader.result;
        setCurrentImg(prev => uploadedImage);
    };
    reader.readAsDataURL(file.current.files[0]);
  };
  return (
    <div className="img-container">
      <div className="delete-imgBtn imgBtn" onClick={deleteImg}>
        Delete
      </div>
      
      <label for="inputTag" className="edit-imgBtn imgBtn">
          Edit
              <input type="file" ref={file} id="inputTag" className="input-img" onClick={editImg} onChange={ changeImage} />
        </label>
          
      {/* <div className='edit-imgBtn imgBtn' onClick={editImg}>Edit</div> */}
      <img
        className="img detail"
        type="image"
        src={currentImg}
        alt=""
      ></img>
    </div>
  );
};
// TODO: add delete button
export default NoteImage;
