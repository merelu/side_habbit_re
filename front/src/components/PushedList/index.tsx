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
import dayjs from "dayjs";
import { getPushed } from "@_reducers/commitSlice";

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
  const { pushed, pushedAll } = useAppSelector((state) => state.commit);
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData && pushedAll) {
      dispatch(getPushed(dayjs().format("YYYY-MM-DD")));
    }
  }, [dispatch, pushedAll, userData]);

  return (
    <>
      {pushed.length > 0 && (
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.title}>
            {`${
              pushed.length > 0
                ? dayjs(pushed[0].createAt).format("YYYY-MM-DD")
                : "Today"
            } Pushed Habbits`}
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
      )}
    </>
  );
}

export default React.memo(PushedList);
