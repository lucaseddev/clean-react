import React, { useEffect, useState } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  Button,
  FormStatus,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',

    email: '',
    emailError: '',

    password: '',
    passwordError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (state.isLoading || state.emailError || state.passwordError) return;

    setState({
      ...state,
      isLoading: true,
    });

    await authentication.auth({
      email: state.email,
      password: state.password,
    });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="login-form"
          className={Styles.form}
          onSubmit={handleSubmit}>
          <h2>Login</h2>

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

          <Button
            className={Styles.submit}
            data-testid="submit"
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}>
            Entrar
          </Button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};
