import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { addGroup } from '../../store/groupReducer';

const CreateGroup = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
        // console.log(name, imgURL, location, description)
        const validationErrors = []
        if (name.length < 2) validationErrors.push("Name must be longer than 2 characters")
        if (location.length < 2) validationErrors.push("location must be longer than 2 characters")
        if (description.length < 10) validationErrors.push("Please provide a more detailed description")
        if (errors.length) {
            setErrors(validationErrors)
        } else {
            dispatch(addGroup(name, imgURL, location, description, sessionUser.id))
        }
    }
  
    return (
      <div className="signup-page-container">
        <h1>Create a Group</h1>
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
          <button className="signup-submit" type="submit">Create Group</button>
        </form>
      </div>
    );
}
  


export default CreateGroup;
