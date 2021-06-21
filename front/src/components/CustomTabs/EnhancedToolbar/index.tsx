import React, { useCallback, useState } from "react";
import { Toolbar, Typography, Tooltip, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { useToolbarStyles } from "./styles";
import DialogForm from "./DialogForm";

interface IEnhancedToolbarProps {
  commitStatus: boolean;
}
export default function EnhancedToolbar({
  commitStatus,
}: IEnhancedToolbarProps) {
  const classes = useToolbarStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCommit = useCallback(() => {}, []);

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
            onClick={handleClickOpen}
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
            onClick={handleCommit}
          >
            Commit
          </Button>
        </Tooltip>
      </div>
      <DialogForm open={open} handleClose={handleClose} />
    </Toolbar>
  );
}
