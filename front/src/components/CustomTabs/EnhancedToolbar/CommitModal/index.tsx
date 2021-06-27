import React, { useCallback, useEffect, useState } from "react";
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
  ListItemSecondaryAction,
  IconButton,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { IHabbit } from "@typings/db";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { handleCheckedState } from "@_reducers/habbitSlice";
import { useCustomTapsStyles } from "@components/CustomTabs/styles";
import { addCommited, deleteCommited } from "@_actions/commit_actions";

interface ICommitModalProps {
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
function CommitModal({ open, onCloseModal }: ICommitModalProps) {
  const classes = useCustomTapsStyles();
  const dispatch = useAppDispatch();
  const [commitHabbits, setCommitHabbits] = useState<IHabbit[]>([]);
  const { userData } = useAppSelector((state) => state.user);
  const { habbits } = useAppSelector((state) => state.habbit);
  const { commited } = useAppSelector((state) => state.commit);

  const onClickCommitedDelete = useCallback(
    (habbitId: string) => {
      if (userData) {
        dispatch(deleteCommited({ habbitId, userId: userData._id }));
      }
    },
    [dispatch, userData]
  );

  const onClickNewCommitDelete = useCallback(
    (_id: string) => {
      if (commitHabbits.length === 1) {
        onCloseModal();
      }
      dispatch(handleCheckedState(_id));
    },
    [commitHabbits.length, dispatch, onCloseModal]
  );

  const submitCommit = useCallback(async () => {
    if (userData) {
      const resultAction = await dispatch(
        addCommited({ commited: commitHabbits, userId: userData._id })
      );
      if (addCommited.fulfilled.match(resultAction)) {
        commitHabbits.forEach((item) => {
          dispatch(handleCheckedState(item._id));
        });
      }
    }

    onCloseModal();
  }, [commitHabbits, dispatch, onCloseModal, userData]);

  useEffect(() => {
    setCommitHabbits(habbits.filter((habbit) => habbit.checked === true));
  }, [habbits]);

  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle>Commit</DialogTitle>
      <DialogContent>
        <DialogContentText>Already Commited</DialogContentText>
        <List>
          {commited &&
            commited.map((commit, index) => (
              <ListItem key={index + "commited"}>
                <ListItemAvatar>
                  <Avatar>{selectIcon(commit.category)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={commit.title}
                  className={classes.wideColumn}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => onClickCommitedDelete(commit.habbitId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <DialogContentText>New commited</DialogContentText>
        <List>
          {commitHabbits.map((habbit) => (
            <ListItem key={habbit._id + "commit"}>
              <ListItemAvatar>
                <Avatar>{selectIcon(habbit.category)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={habbit.title}
                className={classes.wideColumn}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => onClickNewCommitDelete(habbit._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={submitCommit}>
          Commit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(CommitModal);
