export function loginValidate(values) {
  const errors = {};

  //email validation
  if (!values.email) {
    errors.email = "Campo obrigatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalido";
  }

  //password validation
  if (!values.password) {
    errors.password = "Campo obrigatorio";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Deve conter entre 8 e 20 caracteres.";
  } else if (values.password.includes(" ")) {
    errors.password = "Senha invalida";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  //username validation
  if (!values.username) {
    errors.username = "Campo obrigatório";
  } else if (values.username.includes(" ")) {
    errors.username = "Usuário invalido";
  }

  //email validation
  if (!values.email) {
    errors.email = "Campo obrigatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalido";
  }

  //password validation
  if (!values.password) {
    errors.password = "Campo obrigatorio";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Deve conter entre 8 e 20 caracteres.";
  } else if (values.password.includes(" ")) {
    errors.password = "Senha invalida";
  }

  //validate confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Campo obrigatorio";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "A senha deve ser igual nos dois campos";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Confirmação de senha invalida";
  }

  return errors;
}
