import React from "react";
import { Route, Switch } from "react-router";
import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Auth from "@hoc/Auth";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Auth(LandingPage, null)} />
      <Route path="/login" component={Auth(LoginPage, false)} />
      <Route path="/register" component={Auth(RegisterPage, false)} />
    </Switch>
  );
}

export default App;
