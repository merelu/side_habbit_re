import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useRegisterPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: { marginTop: 100 },
    box: {
      width: 300,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    box_register: {
      width: 300,
      marginTop: theme.spacing(2),
    },
    field: {
      width: "100%",
    },
    divider: {
      marginBottom: theme.spacing(5),
    },
    errorMessageBox: {
      marginTop: theme.spacing(10),
    },
    actionBox: {
      width: 300,
      display: "flex",
    },
    link: {
      color: theme.palette.primary.main,
    },
    loginButton: {
      width: "100%",
    },
  })
);
