import React, { useCallback, useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { useloginPageStyles } from "./styles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { push } from "connected-react-router";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

function LoginPage() {
  const dispatch = useAppDispatch();
  const classes = useloginPageStyles();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const [loginError, setLoginError] = useState(false);
  const handleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("/api/users/login", values, { withCredentials: true })
          .then((response) => {
            console.log(response.data);
            dispatch(push("/"));
          })
          .catch((error) => {
            setLoginError(error.response?.data?.statusCode === 401);
          });
        setSubmitting(false);
      }}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <Form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h4" color="primary" align="center">
              Login
            </Typography>
            <Box className={classes.errorMessageBox}>
              {loginError && (
                <Typography variant="h6" align="left" color="secondary">
                  이메일이나 비밀번호가 일치 하지 않습니다.
                </Typography>
              )}
            </Box>
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
  );
}

export default LoginPage;
