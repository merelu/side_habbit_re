import React, { useCallback, useState } from "react";
import { Toolbar, Typography, Tooltip, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { useCustomTapsStyles } from "@components/CustomTabs/styles";
import AddHabbitModal from "./AddHabbitModal";
import CommitModal from "./CommitModal";

interface IEnhancedToolbarProps {
  commitStatus: boolean;
}
export default function EnhancedToolbar({
  commitStatus,
}: IEnhancedToolbarProps) {
  const classes = useCustomTapsStyles();
  const [addHabbitModalOpen, setAddHabbitModalOpen] = useState(false);
  const [commitModalOpen, setCommitModalOpen] = useState(false);

  const onClickAddHabbitModal = useCallback(() => {
    setAddHabbitModalOpen(true);
  }, []);
  const onClickCommitModal = useCallback(() => {
    setCommitModalOpen(true);
  }, []);
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
