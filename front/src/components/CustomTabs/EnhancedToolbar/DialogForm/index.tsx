import React from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  ListItemIcon,
  FormLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Formik, Form, Field, FieldArray } from "formik";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/dayjs";
import { Select, TextField, CheckboxWithLabel } from "formik-material-ui";

interface DialogFormProps {
  open: boolean;
  handleClose: () => void;
}
const initialValues = {
  title: "",
  category: 0,
  expiredDate: dayjs().add(1, "day"),
  schedule: [false, false, false, false, false, false, false],
};
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.number(),
  expiredDate: Yup.date(),
  schedule: Yup.array()
    .of(Yup.boolean().default(false))
    .compact((v) => !v)
    .min(1, "At least one must be checked"),
});

export default function DialogForm({ open, handleClose }: DialogFormProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Habbit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add your habbit, please enter detail contents
        </DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
            }}
          >
            {({ values, touched, errors, submitForm, isSubmitting }) => (
              <Form style={{ marginTop: "20px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="title"
                      type="text"
                      label="Title"
                      multiline
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      <InputLabel htmlFor="category">Category</InputLabel>
                      <Field
                        component={Select}
                        name="category"
                        type="number"
                        inputProps={{
                          id: "category",
                        }}
                      >
                        <MenuItem value={0}>Fitness</MenuItem>
                        <MenuItem value={1}>Study</MenuItem>
                        <MenuItem value={2}>Hobby</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={DatePicker}
                      name="expiredDate"
                      label="ExpiredDate"
                      fullWidth
                      minDate={dayjs().add(1, "day")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      component="fieldset"
                      fullWidth
                      error={errors.schedule && touched.schedule ? true : false}
                    >
                      <FormLabel
                        component="legend"
                        style={{ marginBottom: "10px" }}
                      >
                        Schedule{" "}
                      </FormLabel>
                      <FieldArray
                        name="schedule"
                        render={() => (
                          <FormGroup row>
                            {values.schedule.map((day, index) => (
                              <Field
                                key={`schedule${index}`}
                                name={`schedule.${index}`}
                                component={CheckboxWithLabel}
                                type="checkbox"
                                Label={{
                                  label: dayjs().day(index).format("ddd"),
                                  labelPlacement: "top",
                                }}
                              />
                            ))}
                          </FormGroup>
                        )}
                      />
                      {errors.schedule && touched.schedule && (
                        <span style={{ color: "red" }}>{errors.schedule}</span>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <DialogActions>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </MuiPickersUtilsProvider>
      </DialogContent>
    </Dialog>
  );
}
