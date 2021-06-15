import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
<<<<<<< HEAD
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
=======
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d
import { useDrawerMenuStyles } from "./styles";
import { useAppDispatch } from "../../store/hooks";
import { push } from "connected-react-router";
import { IUser } from "../../typings/db";

interface IDrawerMenu {
  onClickLogout: () => void;
  userData: IUser | null;
}
function DrawerMenu({ userData, onClickLogout }: IDrawerMenu) {
  const dispatch = useAppDispatch();

  const classes = useDrawerMenuStyles();
  const [drawer, setDrawer] = useState(false);

  const handleDrawerToggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setDrawer(open);
    };
  const onClickLogin = useCallback(() => {
    dispatch(push("/login"));
  }, [dispatch]);
<<<<<<< HEAD
  const onClickMyHabbit = useCallback(() => {
    dispatch(push("/myHabbit"));
  }, [dispatch]);
=======
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d

  const menuItemList = (
    <div
      className={classes.list}
      onClick={handleDrawerToggle(false)}
      onKeyDown={handleDrawerToggle(false)}
    >
      <List>
        {userData ? (
<<<<<<< HEAD
          <div>
            <ListItem button key="myHabbit" onClick={onClickMyHabbit}>
              <ListItemIcon>
                <AssignmentIcon color="primary" />
              </ListItemIcon>
              <ListItemText color="primary" primary="My Habbit" />
            </ListItem>
            <Divider />
            <ListItem button key="logout" onClick={onClickLogout}>
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText color="primary" primary="Logout" />
            </ListItem>
          </div>
        ) : (
          <ListItem button key="login" onClick={onClickLogin}>
            <ListItemIcon>
              <GitHubIcon color="primary" />
=======
          <ListItem button key="logout" onClick={onClickLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button key="login" onClick={onClickLogin}>
            <ListItemIcon>
              <GitHubIcon />
>>>>>>> e7a98688cce3752b8f71960a2677d9f6be2da57d
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );
  return (
    <React.Fragment>
      <IconButton edge="end" onClick={handleDrawerToggle(true)}>
        <MenuIcon color="primary" />
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={handleDrawerToggle(false)}>
        {menuItemList}
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerMenu;
