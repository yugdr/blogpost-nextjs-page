import ErrorModal from "../ErrorModal";
import {
  Formik,
  Field,
  Form,
  FieldAttributes,
  useField,
  FormikHelpers,
} from "formik";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import classes from "./CommentsForm.module.scss";
import { Button } from "@mui/material";

interface Values {
  userName: string;
  email: string;
  body: string;
}

const MyTextField: React.FC<FieldAttributes<{}>> = (props) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return <TextField {...field} helperText={errorText} />;
};

const CommentsForm = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [requestFailed, setRequestFailed] = useState(false);

  const postComment = async (e: any) => {
    e.preventDefault();

    const newComment = {
      name,
      email,
      body,
      postId: props.postId,
    };

    try {
      const res = await fetch(
        "https://a25da34c-3fe7-40b5-a61e-2f6a2799ce61.mock.pstmn.io/friendlyCaptcha-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        setName("");
        setEmail("");
        setBody("");
      }
      if (res.status !== 201) {
        setRequestFailed(true);
        // throw new Error("response other than 201");
      }
    } catch (err: any) {
      setRequestFailed(true);
      console.log(err.message);
      // throw new Error("Request failed!");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ userName: "", email: "", body: "" }}
        onSubmit={async (
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setSubmitting(true);

          // make async call
          try {
            const res = await fetch(
              "https://a25da34c-3fe7-40b5-a61e-2f6a2799ce61.mock.pstmn.io/friendlyCaptcha-test",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );

            if (res.status === 201) {
              const data = await res.json();
              console.log(data);
              setSubmitting(false);
              resetForm();
            }
            if (res.status !== 201) {
              setRequestFailed(true);
              // throw new Error("response other than 201");
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className={classes.form}>
            <h4>Add a New Comment</h4>
            <Field
              required
              name="userName"
              type="input"
              as={TextField}
              variant="filled"
              label="User Name"
            />
            <Field
              required
              name="email"
              type="input"
              as={TextField}
              label="E-Mail"
              variant="filled"
            />
            <Field
              required
              name="body"
              type="input"
              as={TextField}
              label="Comment"
              variant="filled"
              multiline
              rows={4}
            />
            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentsForm;
