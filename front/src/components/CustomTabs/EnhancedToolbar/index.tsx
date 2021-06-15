import React, { useCallback, useState } from "react";
import { Toolbar, Typography, Tooltip, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useToobarStyles } from "./styles";
import DialogForm from "./DialogForm";

export default function EnhancedToolbar() {
  const classes = useToobarStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="h5">Habbits</Typography>
      <Tooltip title="Add">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Habbit
        </Button>
      </Tooltip>
      <DialogForm open={open} handleClose={handleClose} />
    </Toolbar>
  );
}
