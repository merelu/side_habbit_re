import React, { useCallback, useState } from "react";
import {
  Toolbar,
  Typography,
  Tooltip,
  Button,
  Hidden,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import BackupIcon from "@material-ui/icons/Backup";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useCustomTapsStyles } from "@components/CustomTabs/styles";
import AddHabbitModal from "./AddHabbitModal";
import CommitModal from "./CommitModal";
import PushModal from "./PushModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { occurError } from "@_reducers/alertSlice";

export default function EnhancedToolbar() {
  const classes = useCustomTapsStyles();
  const dispatch = useAppDispatch();
  const { habbits } = useAppSelector((state) => state.habbit);
  const { commited, error: commitError } = useAppSelector(
    (state) => state.commit
  );
  const [addHabbitModalOpen, setAddHabbitModalOpen] = useState(false);
  const [commitModalOpen, setCommitModalOpen] = useState(false);
  const [pushModalOpen, setPushModalOpen] = useState(false);

  const onClickAddHabbitModal = useCallback(() => {
    setAddHabbitModalOpen(true);
  }, []);

  const onClickCommitModal = useCallback(() => {
    if (
      habbits.filter((habbit) => habbit.checked === true).length === 0 &&
      commited.length === 0
    ) {
      dispatch(occurError(commitError));
    } else {
      setCommitModalOpen(true);
    }
  }, [commitError, commited.length, dispatch, habbits]);

  const onClickPushModal = useCallback(() => {
    if (commited.length === 0) {
      dispatch(occurError("commit된 습관이 없습니다. commit 먼저 해주세요"));
    } else {
      setPushModalOpen(true);
    }
  }, [commited.length, dispatch]);

  const onCloseModal = useCallback(() => {
    setAddHabbitModalOpen(false);
    setCommitModalOpen(false);
    setPushModalOpen(false);
  }, []);

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="h5">Habbits</Typography>
      <Hidden xsDown>
        <div>
          <Tooltip title="Add">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onClickAddHabbitModal}
            >
              Add Habbit
            </Button>
          </Tooltip>
          <Tooltip title="commit">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={onClickCommitModal}
            >
              Commit
            </Button>
          </Tooltip>
          <Tooltip title="commit">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              startIcon={<BackupIcon />}
              onClick={onClickPushModal}
            >
              Push
            </Button>
          </Tooltip>
        </div>
      </Hidden>
      <Hidden smUp>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Hidden>
      <AddHabbitModal open={addHabbitModalOpen} onCloseModal={onCloseModal} />
      <CommitModal open={commitModalOpen} onCloseModal={onCloseModal} />
      <PushModal open={pushModalOpen} onCloseModal={onCloseModal} />
    </Toolbar>
  );
}
