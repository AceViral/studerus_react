export interface IstateForRegisterForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    isError: isErrorTypeForRegisterForm,
    isTouched: isTouchedTypeForRegisterForm,
    show: boolean
}

type isErrorTypeForRegisterForm = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
type isTouchedTypeForRegisterForm = {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export interface IstateForLoginForm {
    username: string,
    email: string,
    password: string,
    isError: isErrorTypeForLoginForm,
    isTouched: isTouchedTypeForLoginForm,
    show: boolean
}

type isErrorTypeForLoginForm = {
    email: string;
    username: string;
    password: string;
}
type isTouchedTypeForLoginForm = {
    email: boolean;
    username: boolean;
    password: boolean;
}

export interface INotification {
    type: "error";
    text: string;
}


