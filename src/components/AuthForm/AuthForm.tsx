import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import "./AuthForm.scss";
import instance from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: "login" | "register";
}

interface FormValues {
  username: string | null;
  email: string | null;
  password: string | null;
}

export const AuthForm: React.FC<Props> = ({
  isLoading,
  setIsLoading,
  type,
}) => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Atleast 4 characaters required")
      .required()
      .nullable(),
    email: Yup.string().email("Email address is invalid").required().nullable(),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
        "Password is incorrect"
      )
      .required()
      .nullable(),
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await instance.post(`/auth/${type}`, values);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
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
          <h2>Studerus-Client</h2>
          <Form className="auth_form">
            <div className="text_field text_field_floating ">
              <Field
                className={[
                  formik.touched.email &&
                    (formik.errors.email
                      ? "text_field__input_invalid"
                      : "text_field__input_valid"),
                  "text_field__input",
                ].join(" ")}
                type="text"
                name="email"
                id="email"
              />
              <label className="text_field__label" htmlFor="email">
                Email
              </label>
              <ErrorMessage name="email">
                {(msg) => <div className="text_field__message">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="text_field text_field_floating">
              <Field
                className={[
                  formik.touched.username &&
                    (formik.errors.username
                      ? "text_field__input_invalid"
                      : "text_field__input_valid"),
                  "text_field__input",
                ].join(" ")}
                type="text"
                name="username"
                id="username"
              />
              <label className="text_field__label" htmlFor="username">
                Username
              </label>
              <ErrorMessage name="username">
                {(msg) => <div className="text_field__message">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="text_field text_field_floating password_field">
              <Field
                className={[
                  formik.touched.password &&
                    (formik.errors.password
                      ? "text_field__input_invalid"
                      : "text_field__input_valid"),
                  "text_field__input",
                ].join(" ")}
                type="password"
                name="password"
                id="password"
              />
              <label className="text_field__label" htmlFor="password">
                Password
              </label>
              <ErrorMessage name="password">
                {(msg) => <div className="text_field__message">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="button-block">
              <button
                type="submit"
                className="submit_btn"
                disabled={
                  isLoading ||
                  !formik.isValid ||
                  formik.values.email?.length === 0 ||
                  formik.values.username?.length === 0 ||
                  formik.values.password?.length === 0
                }
              >
                {isLoading
                  ? "Loading..."
                  : type === "register"
                  ? "Sign up"
                  : "Sign in"}
              </button>
            </div>
            <p
              onClick={() => {
                type === "register"
                  ? navigate("/login")
                  : navigate("/register");
              }}
            >
              {type === "register"
                ? "У вас уже есть аккаунт?"
                : "Хотите создать новый?"}
            </p>
          </Form>
        </>
      )}
    </Formik>
  );
};
