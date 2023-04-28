import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import instance from "../../api/axios";

interface FormValues {
  title: string | null;
  content: string | null;
}

export const NoteForm: React.FC = () => {
  const initialValues: FormValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().nullable(),
    content: Yup.string().required().nullable(),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await instance.post("/note/create-note", values);
    } catch (error) {
      console.log("Form is invalid!");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik: FormikProps<FormValues>) => (
        <>
          <Form className="auth_form">
            <div className="text_field text_field_floating ">
              <Field
                className={[
                  formik.touched.title &&
                    (formik.errors.title
                      ? "text_field__input_invalid"
                      : "text_field__input_valid"),
                  "text_field__input",
                ].join(" ")}
                type="text"
                name="title"
                id="title"
              />
              <label className="text_field__label" htmlFor="title">
                title
              </label>
              <ErrorMessage name="title">
                {(msg) => <div className="text_field__message">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="text_field text_field_floating password_field">
              <Field
                className={[
                  formik.touched.content &&
                    (formik.errors.content
                      ? "text_field__input_invalid"
                      : "text_field__input_valid"),
                  "text_field__input",
                ].join(" ")}
                type="content"
                name="content"
                id="content"
              />
              <label className="text_field__label" htmlFor="content">
                content
              </label>
              <ErrorMessage name="content">
                {(msg) => <div className="text_field__message">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="button-block">
              <button
                type="submit"
                className="submit_btn"
                disabled={
                  !formik.isValid ||
                  formik.values.title?.length === 0 ||
                  formik.values.content?.length === 0
                }
              >
                Add note
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};
