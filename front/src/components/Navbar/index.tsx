import {
  AppBar,
  Typography,
  Hidden,
  Toolbar,
  IconButton,
<<<<<<< HEAD
  Button,
=======
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d
} from "@material-ui/core";

import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DrawerMenu from "../DrawerMenu";
import { useNavBarStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../_actions/user_actions";
import { push } from "connected-react-router";

function MainNavbar() {
  const dispatch = useAppDispatch();
  const classes = useNavBarStyles();
  const { userData } = useAppSelector((state) => state.user);
  const onClickLogout = useCallback(() => {
    dispatch(logoutUser());
    dispatch(push("/"));
  }, [dispatch]);
<<<<<<< HEAD
  const onClickMyHabbit = useCallback(() => {
    dispatch(push("/myHabbit"));
  }, [dispatch]);
=======
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d

  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar className={classes.toobar}>
          <Typography variant="h6" color="primary">
            <Link to="/">Side_Habbit</Link>
          </Typography>
          <Hidden smDown>
            {userData ? (
<<<<<<< HEAD
              <div>
                <Button color="primary">
                  <Link to="/myHabbit">My Habbit</Link>
                </Button>
                <IconButton onClick={onClickMyHabbit}>
                  <ExitToAppIcon color="primary" />
                </IconButton>
              </div>
            ) : (
              <IconButton>
                <Link to="/login">
                  <GitHubIcon color="primary" />
                </Link>
              </IconButton>
=======
              <IconButton onClick={onClickLogout}>
                <ExitToAppIcon />
              </IconButton>
            ) : (
              <Link to="/login">
                <GitHubIcon />
              </Link>
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d
            )}
          </Hidden>
          <Hidden mdUp>
            <DrawerMenu userData={userData} onClickLogout={onClickLogout} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainNavbar;
