import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import axios from "axios";
import gravatar from "gravatar";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { useRegisterPageStyles } from "./styles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { push } from "connected-react-router";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function RegisterPage() {
  const dispatch = useAppDispatch();
  const classes = useRegisterPageStyles();
  const [registerError, setRegisterError] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", name: "", password: "", confirmPassword: "" }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("/api/users/register", values, { withCredentials: true })
          .then((response) => {
            console.log(response.data);
            dispatch(push("/login"));
          })
          .catch((error) => {
            setRegisterError(error.response?.data?.statusCode === 401);
          });
        setSubmitting(false);
      }}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <Form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h4" color="primary" align="center">
              Register
            </Typography>
            <Box className={classes.errorMessageBox}>
              {registerError && (
                <Typography variant="h6" align="left" color="secondary">
                  이미 가입된 이메일 입니다.
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
                name="name"
                type="text"
                label="Name"
                helperText="Please Enter Name"
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
            <Box className={classes.box} marginBottom={3}>
              <Field
                className={classes.field}
                component={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                helperText="Please Enter Confirm Password"
              />
            </Box>
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
