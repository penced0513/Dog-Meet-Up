import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


import { createGroup } from '../../store/groupReducer';
import './createForm.css'

const CreateGroup = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
  
    if (!sessionUser) {
      history.push('/login')
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
        const validationErrors = []
        if (name.length < 2) validationErrors.push("Name must be longer than 2 characters")
        if (location.length < 2) validationErrors.push("location must be longer than 2 characters")
        if (description.length < 10) validationErrors.push("Please provide a more detailed description")
        if (errors.length) {
            setErrors(validationErrors)
        } else {
            const createdGroup = await dispatch(createGroup(name, imgURL, location, description, sessionUser.id))
            if (createdGroup) {
              history.push(`/groups/${createdGroup.id}`)
            }
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
          <div className="form-preview-container">
            {imgURL && <div><div>Image Preview on Groups Page</div><img className="form-img-preview" src={imgURL} alt=""></img></div>}
            {imgURL && <div><div>Image Preview for your Group</div><img className="form-img-preview-large" src={imgURL} alt=""></img></div>}
          </div>
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
