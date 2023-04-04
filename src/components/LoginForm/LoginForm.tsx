import React, { ChangeEvent, FormEvent } from "react";
import { IstateForLoginForm } from "../../types";
import "./LoginForm.scss";
import instance from "../../api/axios";
import { useNavigate } from "react-router-dom";

export class LoginForm extends React.Component<{ navigate: any }> {
  state: IstateForLoginForm = {
    username: "",
    email: "",
    password: "",
    isError: {
      email: "",
      username: "",
      password: "",
    },
    isTouched: {
      email: false,
      username: false,
      password: false,
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
      const userData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      instance
        .post("/auth/login", userData)
        .then(() => {
          this.props.navigate("/");
        })
        .catch(() => {
          alert("error");
        });
    } else {
      console.log("Form is invalid!");
    }
  };

  formValid = ({ isError, ...rest }: IstateForLoginForm): boolean => {
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
          this.setState((prevState: IstateForLoginForm) => {
            return { isTouched: { ...prevState.isTouched, username: true } };
          });
        }
        break;
      case "email":
        isError.email = this.emailRegExp.test(value)
          ? ""
          : "Email address is invalid";
        if (!this.state.isTouched.email) {
          this.setState((prevState: IstateForLoginForm) => {
            return { isTouched: { ...prevState.isTouched, email: true } };
          });
        }
        break;
      case "password":
        isError.password = this.passwordRegExp.test(value)
          ? ""
          : "Password is incorrect";
        if (!this.state.isTouched.password) {
          this.setState((prevState: IstateForLoginForm) => {
            return { isTouched: { ...prevState.isTouched, password: true } };
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
    this.setState((prevState: IstateForLoginForm) => {
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

        <div className="button-block">
          <button type="submit" className="submit_btn" disabled={!isFormValid}>
            Login
          </button>
        </div>
      </form>
    );
  }
}
