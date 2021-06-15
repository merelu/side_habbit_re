import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Formik from "formik";

interface DialogFormProps {
  open: boolean;
  handleClose: () => void;
}
export default function DialogForm({ open, handleClose }: DialogFormProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Habbit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add your habbit, please enter detail contents
        </DialogContentText>
        {/* <Formik initialValues></Formik> */}
      </DialogContent>
    </Dialog>
  );
}
