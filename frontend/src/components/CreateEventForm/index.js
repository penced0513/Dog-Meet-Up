import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


import { getUserGroups } from '../../store/groupReducer'; 
import { fetchVenues } from '../../store/venueRedurcer';
import { createEvent } from '../../store/eventReducer';

const CreateEvent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const venues = useSelector(state => Object.values(state.venue))
    const sessionGroups = useSelector(state => Object.values(state.group.joined))
    const [name, setName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [venueId, setVenueId] = useState(-1)
    const [groupId, setGroupId] = useState(-1)
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
    const [date, setDate] = useState('')
    const [capacity, setCapacity] = useState('')
  
    if (!sessionUser) {
      history.push('/login')
    }
  
    useEffect(() => {
        
        dispatch(fetchVenues())
        dispatch(getUserGroups(sessionUser))

    }, [dispatch])

    const handleSubmit = async(e) => {
      e.preventDefault();
        const validationErrors = []
        if (name.length < 2) validationErrors.push("Name must be longer than 2 characters")
        if (description.length < 10) validationErrors.push("Please provide a more detailed description")
        if (capacity % 1 !== 0) validationErrors.push("Capacity must be a whole number")
        if (venueId === -1) validationErrors.push("Please select a given location")
        if (groupId === -1) validationErrors.push("Please select a group. If there are none listed, try joining or creating one!")
        if (validationErrors.length) {
            setErrors(validationErrors)
        } else {
            const createdEvent = await dispatch(createEvent( name, imgURL, venueId, groupId, description, date, capacity, sessionUser.id))
            if (createdEvent) {
              history.push(`/events/${createdEvent.id}`)
            }
        }
    }
  
    return (
      <div className="signup-page-container">
        <h1>Create an Event</h1>
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
                <option selected value={-1}>Please Choose a Location</option>
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
                <option selected value={-1}>Please Choose a Group</option>
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
          <button className="signup-submit" type="submit">Create Event</button>
        </form>
      </div>
    );
}
  


export default CreateEvent;
