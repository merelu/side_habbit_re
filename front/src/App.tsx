import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
  );
}

export default App;
