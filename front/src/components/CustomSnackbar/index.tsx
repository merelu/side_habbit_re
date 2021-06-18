import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { alertClose } from "../../_reducers/alertSlice";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CustomSnackbar() {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(alertClose());
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.error ? "error" : "success"}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
