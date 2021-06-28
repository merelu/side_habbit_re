import React, { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { useCustomTapsStyles } from "@components/CustomTabs/styles";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  getTodayPushed,
  IPushCommitedBody,
  pushCommited,
} from "@_actions/commit_actions";
import dayjs from "dayjs";
import { getTodayHabbits } from "@_actions/habbit_actions";

interface IPushModalProps {
  open: boolean;
  onCloseModal: () => void;
}

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
function PushModal({ open, onCloseModal }: IPushModalProps) {
  const dispatch = useAppDispatch();
  const { commited } = useAppSelector((state) => state.commit);
  const { userData } = useAppSelector((state) => state.user);
  const classes = useCustomTapsStyles();

  const onClickPushButton = useCallback(async () => {
    if (userData) {
      const body: IPushCommitedBody[] = commited.map((commit) => ({
        writer: commit.writer,
        habbitId: commit.habbitId,
        createAt: dayjs(commit.createAt).toDate(),
      }));
      const resultAction = await dispatch(pushCommited(body));
      if (pushCommited.fulfilled.match(resultAction)) {
        dispatch(
          getTodayHabbits({
            userId: userData._id,
            date: dayjs().format("YYYY-MM-DD"),
          })
        );
        dispatch(getTodayPushed(dayjs().format("YYYY-MM-DD")));
        localStorage.removeItem(`${userData._id}-commited`);
        onCloseModal();
      }
    }
  }, [commited, dispatch, onCloseModal, userData]);

  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle>Push</DialogTitle>
      <DialogContent>
        <DialogContentText>To Push Commits</DialogContentText>
        <List>
          {commited.map((habbit, index) => (
            <ListItem key={index + "pushed"}>
              <ListItemAvatar>
                <Avatar>{selectIcon(habbit.category)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={habbit.title}
                className={classes.wideColumn}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClickPushButton}>
          Push
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PushModal;
