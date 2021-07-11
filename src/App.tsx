import React, { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import HeaderComponent from "./components/header/header.component";
import CurrentUser from "./models/CurrentUser";
import MeetingStartPage from "./pages/meetingStart.page";

function App() {

  const currentUser = useRef(
    new CurrentUser(
      window.localStorage.getItem("userId"),
      window.localStorage.getItem("username"),
      window.localStorage.getItem("name"),
      window.localStorage.getItem("admin"),
      window.localStorage.getItem("orgId"),
      window.localStorage.getItem("org")
    )
  );

  useEffect(() =>{

  });

  return (
    <div>
      
      <Router>
      <HeaderComponent className="mon-header" website={{name: "Monarch", path: "/"}} links={[{name: "About", path: "/about"}, {name: "Reports", path: "/reports"} ]} />
        <Switch>
          <Route exact path="/">
            <HomePage currentUser={currentUser.current}/>
          </Route>
          <Route exact path="/start/:id" component={MeetingStartPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
