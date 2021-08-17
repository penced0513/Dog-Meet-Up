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
        </Switch>
      )}
    </>
  );
}

export default App;
