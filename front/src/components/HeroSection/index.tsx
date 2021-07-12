import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Container,
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
      minHeight: 800,
      paddingTop: 80,
    },
    gridContainer: {
      height: "100%",
    },
    img: {
      maxWidth: 400,
    },
    column1: {
      maxWidth: 600,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    column2: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      background: "inherit",
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
    <Container maxWidth="lg" className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.gridContainer}
      >
        <Grid item sm={12} md={6} className={classes.column1}>
          <Paper elevation={0} className={classes.paper}>
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
          </Paper>
        </Grid>
        <Grid item sm={12} md={6} className={classes.column2}>
          <img
            className={classes.img}
            src={heroSection}
            alt={"heroSecitonImage"}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroSection;
