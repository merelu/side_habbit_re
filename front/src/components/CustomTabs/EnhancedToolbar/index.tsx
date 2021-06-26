import React, { useCallback, useState } from "react";
import { Toolbar, Typography, Tooltip, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { useCustomTapsStyles } from "@components/CustomTabs/styles";
import AddHabbitModal from "./AddHabbitModal";
import CommitModal from "./CommitModal";
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

  const onCloseModal = useCallback(() => {
    setAddHabbitModalOpen(false);
    setCommitModalOpen(false);
  }, []);

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="h5">Habbits</Typography>
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
      </div>
      <AddHabbitModal open={addHabbitModalOpen} onCloseModal={onCloseModal} />
      <CommitModal open={commitModalOpen} onCloseModal={onCloseModal} />
    </Toolbar>
  );
}
