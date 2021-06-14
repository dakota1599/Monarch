import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import HeaderComponent from "./components/header/header.component";

function App() {

  return (
    <div>
      <HeaderComponent className="mon-header" website={{name: "Monarch", path: "/"}} links={[{name: "About", path: "/about"}, {name: "Reports", path: "/reports"} ]} />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
