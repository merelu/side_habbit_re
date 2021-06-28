import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const usePushedListStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: { width: "100%", margin: "50px 0", borderRadius: "15px 15px 0 0" },
    title: {
      padding: theme.spacing(2),
    },
  })
);
