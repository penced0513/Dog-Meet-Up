import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { editGroup} from '../../store/groupReducer';

const EditGroup = ({group, hideForm}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(group.name);
    const [imgURL, setImgURL] = useState(group.img);
    const [location, setLocation] = useState(group.location)
    const [description, setDescription] = useState(group.description)
    const [errors, setErrors] = useState([]);
  
  
    const handleSubmit = async(e) => {
      e.preventDefault();
        const validationErrors = []
        if (name.length < 2) validationErrors.push("Name must be longer than 2 characters")
        if (location.length < 2) validationErrors.push("location must be longer than 2 characters")
        if (description.length < 10) validationErrors.push("Please provide a more detailed description")
        if (errors.length) {
            setErrors(validationErrors)
        } else {
            const editedGroup = await dispatch(editGroup(name, imgURL, location, description, sessionUser.id, group.id))
            if (editedGroup) {
              hideForm()
            }
        }
    }

    return (
      <div className="signup-page-container">
        <h1>Edit your Group</h1>
        <form className="signup-form-container" onSubmit={handleSubmit}>
          <ul className="signup-errors-container">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          {imgURL && <div><div>Image Preview</div><img src={imgURL} alt=""></img></div>}
          <label>
            Image
            <input
              type="text"
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <button className="signup-submit" type="submit">Edit Group</button>
        </form>
      </div>
    );
}
  


export default EditGroup;
