import { createStyles, makeStyles, TableCell, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const useCustomTapsStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: { width: "100%", margin: "50px 0", borderRadius: "15px 15px 0 0" },
    table: {
      minWidth: 400,
    },
    wideColumn: {
      minWidth: "300px",
      wordBreak: "break-all",
    },
    toolbar: { justifyContent: "space-between" },
    button: {
      margin: theme.spacing(1),
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
