import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useContributionGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      margin: "50px 0",
      borderRadius: "15px 15px 15px 15px",
    },
    graph: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
        1
      )}px ${theme.spacing(3)}px`,
    },
    title: {
      padding: theme.spacing(2),
    },
  })
);
