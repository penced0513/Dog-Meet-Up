import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import GroupsPage from "./components/GroupsPage";
import IndividualGroup from './components/IndividualGroup'
import CreateGroup from "./components/CreateGroupForm";
import EventsPage from "./components/EventsPage";
import IndividualEvent from "./components/IndividualEvent"
import CreateEvent from './components/CreateEventForm'
import SecondNavBar from "./components/SecondNavBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/home">
            <Navigation isLoaded={isLoaded} />
            <SecondNavBar></SecondNavBar>
            <HomePage />
          </Route>
          <Route path="/login">
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
          <Route exact path="/groups">
            <Navigation isLoaded={isLoaded} />
            <SecondNavBar></SecondNavBar>
            <GroupsPage />
          </Route>
          <Route exact path="/groups/new">
            <Navigation isLoaded={isLoaded} />
            <CreateGroup />
          </Route>
          <Route exact path="/groups/:groupId">
            <Navigation isLoaded={isLoaded} />
            <IndividualGroup />
          </Route>
          <Route exact path="/events">
            <Navigation isLoaded={isLoaded} />
            <SecondNavBar></SecondNavBar>
            <EventsPage />
          </Route>
          <Route exact path="/events/new">
            <Navigation isLoaded={isLoaded} />
            <CreateEvent />
          </Route>
          <Route exact path="/events/:eventId">
            <Navigation isLoaded={isLoaded} />
            <IndividualEvent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
