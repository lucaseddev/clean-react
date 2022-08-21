import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (state.isLoading || state.emailError || state.passwordError) return;

    setState({
      ...state,
      isLoading: true,
    });

    authentication
      .auth({
        email: state.email,
        password: state.password,
      })
      .then(account => {
        localStorage.setItem('accessToken', account.accessToken);
        navigate('/', { replace: true });
      })
      .catch(error => {
        setState({
          ...state,
          isLoading: false,
          errorMessage: error.message,
        });
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
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};
