import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  function loginDemo (e) {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential:"demo@user.io", password:"password" }))
  };
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        {/* <NavLink to="/groups/new">Start a Group</NavLink> */}
        <ProfileButton className="profile-btn" user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-acc-links">
        <NavLink className="bold-nav-links" to="/login">Log In</NavLink>
        <NavLink className="bold-nav-links" to="/signup">Sign Up</NavLink>
        <NavLink className="bold-nav-links" to="" onClick={loginDemo}>Demo</NavLink>
        <NavLink className="bold-nav-links" to="about-me">About</NavLink>
      </div>
    );
  }

  return (
    <ul id="navbar">
      <li className="nav-link">
        <NavLink className="nav-home bold-nav-links" exact to="/home">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
