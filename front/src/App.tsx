import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router";
import MainNavbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import Auth from "./hocs/Auth";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainNavbar />
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "centers",
        }}
      >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
