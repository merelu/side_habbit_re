import React, { useEffect } from "react";
import {
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { usePushedListStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getTodayPushed } from "@_actions/commit_actions";
import dayjs from "dayjs";

const selectIcon = (value: number) => {
  switch (value) {
    case 0:
      return <FitnessCenterIcon />;
    case 1:
      return <MenuBookIcon />;
    case 2:
      return <SportsEsportsIcon />;
    default:
      return <div>null</div>;
  }
};

function PushedList() {
  const classes = usePushedListStyles();
  const dispatch = useAppDispatch();
  const { pushed } = useAppSelector((state) => state.commit);
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      dispatch(getTodayPushed(dayjs().format("YYYY-MM-DD")));
    }
  }, [dispatch, userData]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Today Pushed Habbits
      </Typography>
      <Divider />
      <List>
        {pushed &&
          pushed.map((item) => (
            <ListItem key={item._id}>
              <ListItemAvatar>
                <Avatar>{selectIcon(item.category)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="detail">
                  <FindInPageIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
}

export default React.memo(PushedList);
