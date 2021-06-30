import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import HeaderComponent from "./components/header/header.component";
import Cookies from 'js-cookie';
import CurrentUser from "./models/CurrentUser";

function App() {

  const currentUser = useRef(
    new CurrentUser(
      Cookies.get("userId"),
      Cookies.get("username"),
      Cookies.get("name"),
      Cookies.get("admin")
    )
  );

  useEffect(() =>{

  });

  return (
    <div>
      <HeaderComponent className="mon-header" website={{name: "Monarch", path: "/"}} links={[{name: "About", path: "/about"}, {name: "Reports", path: "/reports"} ]} />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage currentUser={currentUser.current}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
