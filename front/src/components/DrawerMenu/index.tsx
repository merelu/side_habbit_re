import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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

  const menuItemList = (
    <div
      className={classes.list}
      onClick={handleDrawerToggle(false)}
      onKeyDown={handleDrawerToggle(false)}
    >
      <List>
        {userData ? (
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
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={handleDrawerToggle(false)}>
        {menuItemList}
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerMenu;
