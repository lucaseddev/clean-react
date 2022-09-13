import { AddAccount } from '@/domain/usecases';
import {
  Button,
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';
import React, { useEffect, useState } from 'react';
import Styles from './signup.styles.scss';

type LoginProps = {
  validation: Validation;
  addAccount: AddAccount;
};

export const SignUp: React.FC<LoginProps> = ({ validation, addAccount }) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    name: '',
    nameError: '',

    email: '',
    emailError: '',

    password: '',
    passwordError: '',

    passwordConfirmation: '',
    passwordConfirmationError: 'Campo obrigatório',
  });

  const hasFieldInvalid =
    !!state.emailError ||
    !!state.passwordError ||
    !!state.nameError ||
    !!state.passwordConfirmationError;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (state.isLoading || hasFieldInvalid) return;

    setState({
      ...state,
      isLoading: true,
    });

    addAccount
      .add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      })
      .then(account => account)
      .catch(error => {
        setState({
          ...state,
          isLoading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'password',
        state.passwordConfirmation
      ),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="signup-form">
          <h2>Login</h2>
          <Input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            errorMessage={state.nameError}
          />
          <Input
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            errorMessage={state.emailError}
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            errorMessage={state.passwordError}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Repita sua senha"
            errorMessage={state.passwordConfirmationError}
          />

          <Button
            data-testid="submit"
            disabled={hasFieldInvalid}
            className={Styles.submit}
            type="submit">
            Entrar
          </Button>
          <span
            // to="/login"
            className={Styles.link}>
            Voltar para Login
          </span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};
