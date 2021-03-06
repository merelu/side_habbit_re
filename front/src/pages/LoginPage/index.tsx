import React, { useCallback, useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { useLoginPageStyles } from "./styles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { push } from "connected-react-router";
import { loginUser } from "@_actions/user_actions";
import { occur, occurError } from "@_reducers/alertSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

function LoginPage() {
  const dispatch = useAppDispatch();
  const classes = useLoginPageStyles();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const handleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const initialEmail = localStorage.getItem("rememberMe")
    ? (localStorage.getItem("rememberMe") as string)
    : "";

  return (
    <Container
      maxWidth="lg"
      style={{
        height: "calc(100% - 64px)",
        display: "flex",
        flexDirection: "column",
        background: "#f4f6f8",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{ email: initialEmail, password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const resultAction = await dispatch(loginUser(values));
          if (loginUser.fulfilled.match(resultAction)) {
            if (rememberMe === true) {
              localStorage.setItem("rememberMe", values.email);
            } else {
              localStorage.removeItem("rememberMe");
            }
            dispatch(push("/"));
            dispatch(occur("????????? ??????!"));
          } else {
            if (resultAction.payload) {
              dispatch(occurError(resultAction.payload.errorMessage));
            }
          }
        }}
      >
        {(props) => {
          const { handleSubmit } = props;
          return (
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h4" color="primary" align="center">
                Login
              </Typography>
              <Divider className={classes.divider} />
              <Box className={classes.box} marginBottom={3}>
                <Field
                  className={classes.field}
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  helperText="Please Enter Email"
                />
              </Box>
              <Box className={classes.box} marginBottom={3}>
                <Field
                  className={classes.field}
                  component={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  helperText="Please Enter Password"
                />
              </Box>
              <Box className={classes.box}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMe}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link className={classes.link} to="#">
                  forgot password
                </Link>
              </Box>
              <Button
                className={classes.loginButton}
                variant="contained"
                color="primary"
                type="submit"
              >
                Log in
              </Button>
              <Box className={classes.box_register}>
                Or{" "}
                <Link className={classes.link} to="/register">
                  register now!
                </Link>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default LoginPage;
