import { useState } from "react";

import { Formik, Form, FieldAttributes, useField, FormikHelpers } from "formik";
import { createTheme, ThemeProvider, Button, TextField } from "@mui/material";
import * as yup from "yup";

import ErrorModal from "../ErrorModal";
import { poppins } from "@/lib/fonts";

import classes from "./CommentsForm.module.scss";

// mui theme
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(30 41 59)",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

// interface
interface Values {
  userName: string;
  email: string;
  body: string;
}

// formik custom input field
const MyTextField: React.FC<
  {
    label: string;
    multiline?: boolean;
    rows?: number;
  } & FieldAttributes<{}>
> = ({ label, multiline, rows, ...props }) => {
  const [field, meta] = useField<{}>(props);

  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      variant="filled"
      label={label}
      helperText={errorText}
      error={!!errorText}
      multiline
      rows={rows}
    />
  );
};

// yup validation
const validationSchema = yup.object({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  body: yup.string().required(),
});

const CommentsForm = () => {
  const [networkError, setNetworkError] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Formik
          initialValues={{ userName: "", email: "", body: "" }}
          validationSchema={validationSchema}
          onSubmit={async (
            values: Values,
            { setSubmitting, resetForm }: FormikHelpers<Values>
          ) => {
            setSubmitting(true);

            // make async call
            try {
              const res = await fetch(
                // "https://a25da34c-3fe7-40b5-a61e-2f6a2799ce61.mock.pstmn.io/friendlyCaptcha-test", // test response other than 201
                "https://jsonplaceholder.typicode.com/comments",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              if (res.status === 201) {
                setNetworkError(false);
                const data = await res.json();
                console.log(data);
                setSubmitting(false);
                resetForm();
              }
              if (res.status !== 201) {
                setNetworkError(true);
                throw new Error("response other than 201");
              }
            } catch (error) {
              setNetworkError(true);
              console.log(error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <h4>Add a New Comment</h4>
              <MyTextField name="userName" type="input" label="User Name" />
              <MyTextField name="email" type="input" label="E-Mail" />
              <MyTextField
                name="body"
                type="input"
                label="Comment"
                multiline
                rows={4}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className={classes.submitButton}
              >
                Submit
              </Button>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
        {networkError ? <ErrorModal /> : null}
      </div>
    </ThemeProvider>
  );
};

export default CommentsForm;
