import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  Container,
  CardContent,
  CardMedia,
  createStyles,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useAppDispatch } from "@store/hooks";
import { push } from "connected-react-router";
import { cardImageData } from "@image/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: 800,
      paddingTop: 80,
    },
    gridContainer: {
      height: "100%",
    },
    topline: {
      color: theme.palette.warning.light,
      fontWeight: theme.typography.fontWeightBold,
    },
    card: {
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      height: 300,
      padding: 10,
      boxShadow: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.02)",
        transition: "all 0.2s ease-in-out",
      },
      [theme.breakpoints.up("lg")]: {
        height: 500,
      },
    },
    cardContent: {
      [theme.breakpoints.up("lg")]: {
        height: 250,
      },
    },
    img: {
      height: 160,
      width: 160,
      marginBottom: 10,
    },
    h6: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

function InfoSection() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography
        gutterBottom
        align="center"
        variant="h3"
        className={classes.topline}
      >
        Service
      </Typography>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <img
              className={classes.img}
              src={cardImageData[0].img}
              alt={cardImageData[0].title}
            />
            <CardContent className={classes.cardContent}>
              <Typography align="center" variant="h6" className={classes.h6}>
                ?????? ??????
              </Typography>
              <Typography paragraph>
                ??????????????? ?????? ????????? ??????????????????.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <img
              className={classes.img}
              src={cardImageData[1].img}
              alt={cardImageData[1].title}
            />
            <CardContent className={classes.cardContent}>
              <Typography align="center" variant="h6" className={classes.h6}>
                ?????? ??????
              </Typography>
              <Typography paragraph>???????????? ????????? ???????????????.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <img
              className={classes.img}
              src={cardImageData[2].img}
              alt={cardImageData[2].title}
            />
            <CardContent className={classes.cardContent}>
              <Typography align="center" variant="h6" className={classes.h6}>
                ?????? ??????
              </Typography>
              <Typography paragraph>
                ????????? ????????? ??????????????? ???????????????.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <img
              className={classes.img}
              src={cardImageData[3].img}
              alt={cardImageData[3].title}
            />
            <CardContent className={classes.cardContent}>
              <Typography align="center" variant="h6" className={classes.h6}>
                ???????????? ????????? ?????????.
              </Typography>
              <Typography paragraph>
                ???????????? ????????? ????????? ??????????????? ??????????????????!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InfoSection;
