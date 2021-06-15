import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useToobarStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: { justifyContent: "space-between" },
  })
);
