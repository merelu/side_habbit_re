import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import MainNavbar from "./components/Navbar";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainNavbar />
    </ThemeProvider>
  );
}

export default App;
