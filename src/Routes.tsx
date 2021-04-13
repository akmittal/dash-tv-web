import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Category from "./components/Category";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
interface Props{
  selectedLanguages:string[]
}
export  function Routes({selectedLanguages}:Props) {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        {/* <Route path="/category/:name">
          <Category />
        </Route> */}
        <Route path="/watch/:url">
          <Watch />
        </Route>
        <Route path="/">
          <Home selectedLanguages={selectedLanguages} />
        </Route>
      </Switch>
    </Router>
  );
}
