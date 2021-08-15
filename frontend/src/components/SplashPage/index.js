import './SplashPage.css';

export default function SplashPage () {
    return (
        <div className="splash-container">
            <div className="splash-header-container">
                <h1>How DoggieMeetup works</h1>
                 <p>Meet new people with furry bestfriends through online and in-person events. It's free to create an account.</p>
            </div>
            <div className="splash-options-container">
                <div className="splash-find-container splash-card">
                    <img className="splash-card-img" src="https://www.thesprucepets.com/thmb/8UoRaaDlx0dCBOyFa5-UhSZF71Y=/1183x887/smart/filters:no_upscale()/GettyImages-175928868-120f47906f4849969fcdab28e2e4f494.jpg" alt="high five!"></img>
                    <h2>Join a Group</h2>
                    <p>Find others who love the same activities as you and join them!</p>
                </div>
                <div className="splash-event-container splash-card">
                <img className="splash-card-img" src="https://www.gopetfriendly.com/blog/wp-content/uploads/2019/05/Sedona_GoPetFriendly_3-e1558112807300.jpg" alt="high five!"></img>
                    <h2>Find an event</h2>
                    <p>Events are happening for any doggie activity you can think of. Find some now!</p>
                </div>
                <div className="splash-start-container splash-card">
                <img className="splash-card-img" src="https://i.insider.com/59e8ab6449e1cf73038b4648?width=700" alt="high five!"></img>
                    <h2>Start a group</h2>
                    <p>You don't have to be an expert to gether people together and plan meetups with your furry friends</p>
                </div>
            </div>
        </div>
    )
}
