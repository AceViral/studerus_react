export interface Istate {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    isError: isErrorType,
    isTouched: isTouchedType,
    show: boolean
}

export interface IisError {
    isError: isErrorType
}
type isErrorType = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
type isTouchedType = {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
}