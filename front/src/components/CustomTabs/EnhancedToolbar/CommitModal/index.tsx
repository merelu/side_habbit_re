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
  const [alreadyCommited, setAlreadyCommited] = useState<IHabbit[]>([]);
  const { habbits } = useAppSelector((state) => state.habbit);

  const onClickAlreadyCommitedDelete = useCallback(
    (_id: string) => {
      let localCommited = localStorage.getItem("commited");
      let parseCommited: string[] = [];
      parseCommited = localCommited
        ? (JSON.parse(localCommited) as string[])
        : [];
      parseCommited = parseCommited.filter((commit) => commit !== _id);
      if (parseCommited.length === 0) {
        onCloseModal();
        localStorage.removeItem("commited");
      } else {
        localStorage.setItem("commited", JSON.stringify(parseCommited));
        setAlreadyCommited((prev) => prev.filter((item) => item._id !== _id));
      }
    },
    [onCloseModal]
  );

  const onClickNewCommitDelete = useCallback(
    (_id: string) => {
      if (commitHabbits.length === 1) {
        dispatch(handleCheckedState);
        onCloseModal();
      } else {
        dispatch(handleCheckedState(_id));
      }
    },
    [commitHabbits.length, dispatch, onCloseModal]
  );

  const submitCommit = useCallback(() => {
    const commited = commitHabbits.map((habbit) => habbit._id);
    if (localStorage.getItem("commited") === null) {
      localStorage.setItem("commited", JSON.stringify(commited));
      commited.forEach((commit) => {
        dispatch(handleCheckedState(commit));
      });
    } else {
      let localCommited = localStorage.getItem("commited");
      let parseCommited: string[] = [];
      parseCommited = localCommited
        ? (JSON.parse(localCommited) as string[])
        : [];
      commited.forEach((commit) => {
        if (parseCommited.indexOf(commit) < 0) {
          parseCommited.push(commit);
          dispatch(handleCheckedState(commit));
        }
      });

      localStorage.setItem("commited", JSON.stringify(parseCommited));
    }
    onCloseModal();
  }, [commitHabbits, dispatch, onCloseModal]);

  useEffect(() => {
    setCommitHabbits(habbits.filter((habbit) => habbit.checked === true));
    if (localStorage.getItem("commited") !== null) {
      let localCommited = localStorage.getItem("commited");
      let parseCommited: string[] = [];
      let already: IHabbit[] = [];
      parseCommited = localCommited
        ? (JSON.parse(localCommited) as string[])
        : [];
      parseCommited.forEach((id) => {
        habbits.forEach((habbit) => {
          if (habbit._id === id) {
            already.push(habbit);
          }
        });
      });
      setAlreadyCommited(already);
    }
  }, [habbits]);

  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle>Commit</DialogTitle>
      <DialogContent>
        <DialogContentText>Already Commited</DialogContentText>
        <List>
          {alreadyCommited.map((habbit) => (
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
                  onClick={(e) => onClickAlreadyCommitedDelete(habbit._id)}
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
