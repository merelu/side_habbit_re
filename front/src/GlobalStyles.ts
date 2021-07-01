import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        width: "100%",
        background: "linear-gradient(180deg ,#4a06a3 25% , #6908e8)",
      },
      a: {
        textDecoration: "none",
        color: "inherit",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
