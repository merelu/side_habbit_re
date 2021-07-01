import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  createStyles,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import heroSection from "@image/heroSection.svg";
import { useAppDispatch } from "@store/hooks";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
    },
    img: {
      width: "100%",
    },
    topline: {
      color: theme.palette.warning.light,
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    buttonWrap: {
      display: "flex",
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
    button: {
      background: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
    },
  })
);
function HeroSection() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const onClickButton = () => {
    dispatch(push("/register"));
  };
  return (
    <>
      <Grid
        container
        className={classes.container}
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid
          container
          sm={12}
          md={6}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h3" gutterBottom className={classes.topline}>
              Info
            </Typography>
            <Typography variant="h4" gutterBottom className={classes.text}>
              좋은 습관이 필요하시나요!
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.text}>
              당신을 위한 습관 플래너 입니다.
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.text}>
              계획하시고 실천해 보세요!
            </Typography>
            <div className={classes.buttonWrap}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={onClickButton}
              >
                Get Started
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container sm={12} md={6} alignItems="center">
          <img
            className={classes.img}
            src={heroSection}
            alt={"heroSecitonImage"}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default HeroSection;
