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
import { Link } from "react-router-dom";
import { useDrawerMenuStyles } from "./styles";

type TMenuItems = {
  name: string;
  url: string;
  icon: "login" | "signUp";
};
const menuItems: TMenuItems[] = [
  {
    name: "Login",
    url: "/login",
    icon: "login",
  },
];

function DrawerMenu() {
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

  const selectIcon = useCallback((value) => {
    switch (value) {
      case "login":
        return <GitHubIcon />;
      default:
        return <div>undefined</div>;
    }
  }, []);

  const menuItemList = (
    <div
      className={classes.list}
      onClick={handleDrawerToggle(false)}
      onKeyDown={handleDrawerToggle(false)}
    >
      <List>
        {menuItems.map((item) => (
          <Link to={item.url}>
            <ListItem button key={item.name}>
              <ListItemIcon>{selectIcon(item.icon)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
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
