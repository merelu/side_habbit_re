import {
  createStyles,
  makeStyles,
  TableCell,
  Theme,
  withStyles,
} from "@material-ui/core";

export const useTasksStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 400,
    },
    wideColumn: {
      wordBreak: "break-all",
    },
  })
);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);
