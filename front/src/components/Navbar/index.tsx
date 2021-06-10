import { AppBar, Typography, Hidden, Toolbar } from "@material-ui/core";

import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import DrawerMenu from "../DrawerMenu";
import { useNavBarStyles } from "./styles";

function MainNavbar() {
  const classes = useNavBarStyles();
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar className={classes.toobar}>
          <Typography variant="h6" color="primary">
            <Link to="/">Side_Habbit</Link>
          </Typography>
          <Hidden smDown>
            <Link to="/login">
              <GitHubIcon />
            </Link>
          </Hidden>
          <Hidden mdUp>
            <DrawerMenu />
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainNavbar;
