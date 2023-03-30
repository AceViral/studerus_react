import React, { ChangeEvent, FormEvent } from "react";
import { authAPI } from "../../api/api";
import { IisError, Istate } from "../../types";
import "./RegisterForm.scss";

export class RegisterForm extends React.Component<{}> {
  state: Istate = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isError: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    isTouched: {
      email: false,
      username: false,
      password: false,
      confirmPassword: false,
    },
    show: false,
  };

  emailRegExp = RegExp(/^[a-zA-Z0-9-=)(!#$%^&*]+@[a-zA-Z0-9]+\.[A-Za-z]+/);
  passwordRegExp = RegExp(
    /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
  );

  onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.formValid(this.state)) {
      try {
        const userData = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
        const response = await authAPI.register(userData);
        console.log("Registration successful", response.data);
      } catch (error) {
        console.error("Registration failed", error);
      }
    } else {
      console.log("Form is invalid!");
    }
  };

  formValid = ({ isError, ...rest }: Istate): boolean => {
    let isValid = true;
    Object.values(isError).forEach((val) => {
      if (val.length > 0) {
        isValid = false;
      }
    });
    Object.values(rest).forEach((val) => {
      if (val === null || val === "") {
        isValid = false;
      }
    });
    return isValid;
  };

  formValChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "username":
        isError.username =
          value.length < 4 ? "Atleast 4 characaters required" : "";
        if (!this.state.isTouched.username) {
          this.setState((prevState: Istate) => {
            return { isTouched: { ...prevState.isTouched, username: true } };
          });
        }
        break;
      case "email":
        isError.email = this.emailRegExp.test(value)
          ? ""
          : "Email address is invalid";
        if (!this.state.isTouched.email) {
          this.setState((prevState: Istate) => {
            return { isTouched: { ...prevState.isTouched, email: true } };
          });
        }
        break;
      case "password":
        isError.password = this.passwordRegExp.test(value)
          ? ""
          : "Password is incorrect";
        if (!this.state.isTouched.password) {
          this.setState((prevState: Istate) => {
            return { isTouched: { ...prevState.isTouched, password: true } };
          });
        }
        break;
      case "confirmPassword":
        isError.confirmPassword =
          value !== this.state.password ? "Passwords do not match" : "";
        if (!this.state.isTouched.confirmPassword) {
          this.setState((prevState: Istate) => {
            return {
              isTouched: { ...prevState.isTouched, confirmPassword: true },
            };
          });
        }
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [name]: value,
    });
  };

  openHidePass = () => {
    this.setState((prevState: Istate) => {
      return { show: !prevState.show };
    });
  };

  render() {
    const { isError, isTouched } = this.state;
    const isFormValid = this.formValid(this.state);
    return (
      <form className="register_form" onSubmit={this.onSubmit}>
        <div className="text_field text_field_floating ">
          <input
            className={[
              isTouched.email &&
                (isError.email.length > 0
                  ? "text_field__input_invalid"
                  : "text_field__input_valid"),
              "text_field__input",
            ].join(" ")}
            onChange={this.formValChange}
            type="text"
            name="email"
            id="email"
          />
          <label className="text_field__label" htmlFor="email">
            Email
          </label>
          <div className="text_field__message">{isError.email}</div>
        </div>

        <div className="text_field text_field_floating">
          <input
            className={[
              isTouched.username &&
                (isError.username.length > 0
                  ? "text_field__input_invalid"
                  : "text_field__input_valid"),
              "text_field__input",
            ].join(" ")}
            onChange={this.formValChange}
            type="text"
            name="username"
            id="username"
          />
          <label className="text_field__label" htmlFor="username">
            Username
          </label>
          <div className="text_field__message">{isError.username}</div>
        </div>

        <div className="text_field text_field_floating password_field">
          <input
            className={[
              isTouched.password &&
                (isError.password.length > 0
                  ? "text_field__input_invalid"
                  : "text_field__input_valid"),
              "text_field__input",
            ].join(" ")}
            onChange={this.formValChange}
            type={this.state.show ? "text" : "password"}
            name="password"
            id="password"
          />
          <img
            className="hide_show_btn"
            onClick={this.openHidePass}
            src={
              this.state.show
                ? "https://www.svgrepo.com/show/505879/eye-closed.svg"
                : "https://www.svgrepo.com/show/505645/eye-open.svg"
            }
            alt="eye"
          />
          <label className="text_field__label" htmlFor="password">
            Password
          </label>
          <div className="text_field__message">{isError.password}</div>
        </div>

        <div className="text_field text_field_floating password_field">
          <input
            className={[
              isTouched.confirmPassword &&
                (isError.confirmPassword.length > 0
                  ? "text_field__input_invalid"
                  : "text_field__input_valid"),
              "text_field__input",
            ].join(" ")}
            onChange={this.formValChange}
            type={this.state.show ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
          />
          <label className="text_field__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="text_field__message">{isError.confirmPassword}</div>
        </div>

        <div className="button-block">
          <button type="submit" className="submit_btn" disabled={!isFormValid}>
            Register
          </button>
        </div>
      </form>
    );
  }
}
