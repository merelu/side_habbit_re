import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router";
import dotenv from "dotenv";
import MainNavbar from "@components/Navbar";
import CustomSnackbar from "@components/CustomSnackbar";
import GlobalStyles from "./GlobalStyles";
import Auth from "@hocs/Auth";
import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import MyHabbitPage from "@pages/MyHabbitPage";
import RegisterPage from "@pages/RegisterPage";
import theme from "./theme";
import UserInfoPage from "@pages/UserInfoPage";

dotenv.config();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/myHabbit" component={Auth(MyHabbitPage, true)} />
        <Route path="/userInfo" component={Auth(UserInfoPage, true)} />
      </Switch>
      <CustomSnackbar />
    </ThemeProvider>
  );
}

export default App;
