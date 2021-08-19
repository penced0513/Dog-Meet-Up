import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editEvent } from '../../store/eventReducer';

const EditEventForm = ({event, hideForm}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const venues = useSelector(state => Object.values(state.venue))
    const sessionGroups = useSelector(state => Object.values(state.group.joined))
    const [name, setName] = useState(event.name);
    const [imgURL, setImgURL] = useState(event.img);
    const [venueId, setVenueId] = useState(event.venueId)
    const [groupId, setGroupId] = useState(event.categoryId)
    const [description, setDescription] = useState(event.description)
    const [errors, setErrors] = useState([]);
    const [date, setDate] = useState(event.date.slice(0,16))
    const [capacity, setCapacity] = useState(event.capacity)

    const handleSubmit = async(e) => {
      e.preventDefault();
        const validationErrors = []
        if (name.length < 2) validationErrors.push("Name must be longer than 2 characters")
        if (description.length < 10) validationErrors.push("Please provide a more detailed description")
        if (capacity % 1 !== 0) validationErrors.push("Capacity must be a whole number")
        if (venueId === -1) validationErrors.push("Please select a given location")
        if (groupId === -1) validationErrors.push("Please select a group. If there are none listed, try joining or creating one!")
        if (Date.parse(date) < Date.now()) validationErrors.push("Date must be in the future.")
        if (validationErrors.length) {
            setErrors(validationErrors)
        } else {
            const editedEvent = await dispatch(editEvent( name, event.id, imgURL, venueId, groupId, description, date, capacity, sessionUser.id))
            if (editedEvent) {
                hideForm()
            }
        }
    }
  
    return (
      <div className="signup-page-container">
        <h1>Edit an Event</h1>
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
            <select               
                value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              required
            >
                <option value={-1}>Please Choose a Location</option>
                {venues?.map(venue => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
            </select>
          </label>
          <label>
            Group
            <select               
                value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            >
                <option value={-1}>Please Choose a Group</option>
                {sessionGroups?.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
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
          <label>
            Date
            <input   
              type="datetime-local"            
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            >
            </input>
          </label>
          <label>
            Capacity
            <input   
              type="number" 
              step="1"           
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            >
            </input>
          </label>
          <button className="signup-submit" type="submit">Edit Event</button>
        </form>
      </div>
    );
}
  


export default EditEventForm;
