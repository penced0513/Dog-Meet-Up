import './SplashPage.css';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';



export default function SplashPage () {
    const dispatch = useDispatch()
    function loginDemo () {
        return dispatch(sessionActions.login({ credential:"demo@user.io", password:"password" }))
    };

    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) {
        return <Redirect to="/home" />
    }
     
    return (
        <div className="splash-container">
            <div className="user-acc-links splash-acc-links">
                <NavLink className="bold-nav-links" to="/login">Log In</NavLink>
                <NavLink className="bold-nav-links" to="/signup">Sign Up</NavLink>
                <NavLink className="bold-nav-links" to="" onClick={loginDemo}>Demo</NavLink>
                <NavLink className="bold-nav-links" to="about-me">About</NavLink>
             </div>
            <div className="splash-header-container">
                <h1>How Dog Meetup works</h1>
                 <p>Meet new people with furry best friends through online and in-person events. It's free to create an account.</p>
            </div>
            <div className="splash-options-container">
                <div className="splash-find-container splash-card">
                    <img className="splash-card-img" src="https://www.thesprucepets.com/thmb/8UoRaaDlx0dCBOyFa5-UhSZF71Y=/1183x887/smart/filters:no_upscale()/GettyImages-175928868-120f47906f4849969fcdab28e2e4f494.jpg" alt="high five!"></img>
                    <NavLink className="splash-card-header" to="/groups">Find a Group</NavLink>
                    <p>Find others who love the same activities as you and join them!</p>
                </div>
                <div className="splash-event-container splash-card">
                <img className="splash-card-img" src="https://www.gopetfriendly.com/blog/wp-content/uploads/2019/05/Sedona_GoPetFriendly_3-e1558112807300.jpg" alt="high five!"></img>
                    <NavLink to="/events" className="splash-card-header">Find an event</NavLink>
                    <p>Events are happening for any doggie activity you can think of. Find some now!</p>
                </div>
                <div className="splash-start-container splash-card">
                <img className="splash-card-img" src="https://i.insider.com/59e8ab6449e1cf73038b4648?width=700" alt="high five!"></img>
                    <NavLink className="splash-card-header" to={sessionUser ? "/groups/new" : "/login"}>Start a Group</NavLink>
                    <p>You don't have to be an expert to gether people together and plan meetups with your furry friends</p>
                </div>
            </div>
        </div>
    )
}
