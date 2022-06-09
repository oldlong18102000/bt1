import { ILoginParams, ILoginValidation, ISignUpParams, ISignUpValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const validateSignup = (values: ISignUpParams): ISignUpValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
    name: values.name,
    gender: values.gender,
    region: values.region,
    state: values.state,
  };
};

export const validSignup = (values: ISignUpValidation) => {
  return !values.email && !values.password;
};

export const validateRepeatPassword = (password: string, repeatPassword: string) => {
  if (!repeatPassword) {
    return 'passwordRequire';
  }

  if (password !== repeatPassword) {
    return 'matchPasswordInvalid';
  }
  return '';
};

export const validateField = (field: string, value: string) => {
  if (value) return '';
  let fieldRequire = '';
  switch (field) {
    case 'name':
      fieldRequire = 'nameRequired';
      break;

    case 'gender':
      fieldRequire = 'genderRequired';
      break;

    case 'region':
      fieldRequire = 'regionRequired';
      break;

    case 'state':
      fieldRequire = 'stateRequired';
      break;
  }

  return fieldRequire;
};
