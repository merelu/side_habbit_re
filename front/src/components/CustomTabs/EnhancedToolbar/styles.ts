import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: { justifyContent: "space-between" },
    button: {
      margin: theme.spacing(1),
    },
  })
);
