import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { Box, Button, Divider, Typography, Container } from "@material-ui/core";
import { useRegisterPageStyles } from "./styles";
import { useAppDispatch } from "@store/hooks";
import { push } from "connected-react-router";
import { registerUser } from "@_actions/user_actions";
import { occur, occurError } from "@_reducers/alertSlice";

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

function UserForm() {
  const dispatch = useAppDispatch();
  const classes = useRegisterPageStyles();
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const resultAction = await dispatch(
          registerUser({
            email: values.email,
            name: values.name,
            password: values.password,
          })
        );
        if (registerUser.fulfilled.match(resultAction)) {
          dispatch(push("/login"));
          dispatch(occur("회원가입 성공!"));
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
              Register
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

export default UserForm;
